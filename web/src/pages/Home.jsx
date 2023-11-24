import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Datepicker } from 'flowbite-react';
import Dropdown from "../components/DropDown/Dropdown";
import RangeSlider from "../components/RangeSlider/RangeSlider";
import { Cities, PropertyTypes } from "../static/filterData";
import CardComponent from "../components/Card/Card";
import { Button } from "flowbite-react";
import Divider from "../components/Divider/Divider";
import Loader from "../components/Loader/Loader";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceMenuRef = useRef(null)

  const [propertyData, setPropertyData] = useState([])
  const [filteredPropertyData, setFilteredPropertyData] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    availableFrom: searchParams.get('availableFrom') || new Date().toDateString(),
    price: JSON.parse(searchParams.get('price')) || { start: 10000, end: 30000},
    propertyType: searchParams.get('propertyType') || ''
  })
  const [cityFilter, selectCityFilter] = useState(filters.city)
  const [availableFrom, setAvailableFrom] = useState(filters.availableFrom)
  const [showSlider, setShowSlider] = useState(false)
  const [priceFilter, setPriceFilter] = useState({
    start: 10000,
    end: 30000
  })
  const [propertyTypeFilter, selectPropertyTypeFilter] = useState(filters.propertyType)

  const getPropertyData = async () => {
    setLoading(true)
    try {
      const resposne = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/list-properties`)
      setPropertyData(resposne.data.message)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
    
  }

  // useEffect has been used to fetch data from the API
  useEffect(() => {
    getPropertyData()
  }, [filters])

  // useEffect has been used to apply filters to the tool on each change of router query params
  useEffect(() => {
    
    if (filters.city) selectCityFilter(filters.city);
    if (filters.availableFrom) setAvailableFrom(filters.availableFrom);
    if (filters.propertyType) selectPropertyTypeFilter(filters.propertyType);
    if (filters.price) setPriceFilter(filters.price);

  }, [filters])

  // useEffect has been used to close the price filter dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priceMenuRef.current && !priceMenuRef.current.contains(event.target)) {
        setShowSlider(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  // useEffect has been used to apply filters to the tool on each change of router query params
  useEffect(() => {
    
    if (propertyData.length) {
      setLoading(true)
      const filteredData = propertyData.filter((property) => {
        console.log(property)
        if (filters.city && property.location.toLowerCase() !== filters.city.toLowerCase()) return false;
        if (filters.availableFrom && new Date(property.availableDate) > new Date(filters.availableFrom)) return false;
        if (filters.price.start && property.pricePerMonth < filters.price.start) return false;
        if (filters.price.end && property.pricePerMonth > filters.price.end) return false;
        if (filters.propertyType && property.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) return false;
        return true;
      })

      setFilteredPropertyData(filteredData)
      setLoading(false)
    }
    
  }, [propertyData, filters])

  const handleClearFilters = () => {
    setShowSlider(false)

    setFilters({
      city: '',
      availableFrom: new Date().toDateString(),
      price: { start: 10000, end: 30000},
      propertyType: ''
    })
    selectCityFilter('')
    setAvailableFrom(new Date().toDateString())
    setPriceFilter({
      start: 10000,
      end: 30000
    })
    selectPropertyTypeFilter('')

    setSearchParams({})
  }

  const handleApplyFilters = () => {
    setShowSlider(false)
    setFilters({
      city: cityFilter,
      availableFrom: availableFrom,
      price: priceFilter,
      propertyType: propertyTypeFilter
    })

    if (cityFilter) searchParams.set('city', cityFilter);

    if (availableFrom) searchParams.set('availableFrom', availableFrom);
    if (priceFilter) searchParams.set('price', JSON.stringify(priceFilter));
    if (propertyTypeFilter) searchParams.set('propertyType', propertyTypeFilter);

    setSearchParams(searchParams)

  }

  return (
    <Layout>
      <div className="container py-6 mx-auto">
        <h1 className="text-4xl text-center font-extrabold font-montserrat">Search Properties for Rent</h1>
      </div>
      <div className="flex p-2 px-4 bg-gray-200 gap-2 justify-between w-full flex-wrap">
        <div className="w-full lg:w-auto flex flex-col gap-2">
          <div className="text-gray-500">
            City
          </div>
          <div>
            <Dropdown options={Cities} label='All Cities' selectedValue={cityFilter} setSelectedValue={selectCityFilter} />
          </div>
        </div>
        <Divider />
        <div className="w-full lg:w-auto flex flex-col gap-2">
          <div className="text-gray-500">
            Available From
          </div>
          <div>
            <Datepicker value={availableFrom} onSelectedDateChanged={(data) => (setAvailableFrom(data.toDateString()))} />
          </div>
        </div>
        <Divider />
        <div className="w-full lg:w-auto flex flex-col gap-2" ref={priceMenuRef}>
          <div className="text-gray-500">
            Price
          </div>
          <div className="relative">
            <Button onClick={() => setShowSlider(!showSlider)} color="blue" className="w-full">
              <div>{priceFilter ? `Rs. ${priceFilter.start} - Rs. ${priceFilter.end}` : 'Select Price'}</div>
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </Button>
            {showSlider && <RangeSlider min={0} max={30000} currentValue={priceFilter} setCurrentValue={setPriceFilter} />}
          </div>
        </div>
        <Divider />
        <div className="w-full lg:w-auto flex flex-col gap-2">
          <div className="text-gray-500">
            Property Type
          </div>
          <div>
            <Dropdown options={PropertyTypes} label='All Property Types' selectedValue={propertyTypeFilter} setSelectedValue={selectPropertyTypeFilter} />
          </div>
        </div>
        <Divider />
        <div className="my-4 md:my-auto flex gap-2 w-fit">
          <Button color="purple" size="lg" className="shadow-lg" onClick={() => handleClearFilters()} outline>Clear</Button>
          <Button color="purple" size="lg" className="shadow-lg" onClick={() => handleApplyFilters()}>Apply</Button>
        </div>
      </div>
      {loading ? <Loader /> : <div className="flex flex-wrap justify-center gap-8 md:justify-start my-6">
        {filteredPropertyData.length ? filteredPropertyData.map((property, index) => (<CardComponent key={index} propertyData={property} />)) : <div className="w-full h-96 flex"> <div className="m-auto">No matches found...</div> </div>} </div>
      }
    </Layout>
  )
}
