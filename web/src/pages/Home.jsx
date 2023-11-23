import Layout from "../components/Layout/Layout"
import { Datepicker } from 'flowbite-react';
import Dropdown from "../components/DropDown/Dropdown";
import RangeSlider from "../components/RangeSlider/RangeSlider"
import CardComponent from "../components/Card/Card";

export default function Home() {
  return (
    <Layout>
        <div className="container py-4 mx-auto">
            <h3 className="text-3xl font-extrabold">Search Properties for Rent</h3>
        </div>
        <div className="flex p-2 bg-gray-200 w-full">
            <Dropdown />
            <RangeSlider min={0} max={100} initialValue={20} />
        </div>
        <CardComponent />
    </Layout>
  )
}
