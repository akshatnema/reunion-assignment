import { Card } from 'flowbite-react';

export default function CardComponent({ propertyData = {} }) {
    return (
        <Card
            className="max-w-xs h-full md:max-w-sm md:w-full rounded-md"
            renderImage={() => <img src={`${propertyData.imageUrl}`} alt="image 1" loading='lazy' className='h-52 object-cover' />}
        >
            <div className='flex-1'>
                <div>
                    <span className='text-lg text-purple-600 font-semibold'>Rs. {propertyData.pricePerMonth}</span>/month
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {propertyData.name}
                </h5>
                <p className="font-normal text-gray-700">
                    <span className='font-bold'>Address</span> - {propertyData.location}
                </p>
                <p className="font-normal text-gray-700">
                    <span className='font-bold'>Property Type</span> - {propertyData.propertyType}
                </p>
            </div>
            <div className=''>
                <hr />
                <div className='flex justify-between gap-2 pt-2'>
                    <div>
                        <i className="fa-solid fa-bed"></i>
                        <span className='ml-2 text-sm'>{propertyData.propertyFeatures.beds} Beds</span>
                    </div>
                    <div>
                        <i className="fa-regular fa-circle-check"></i>
                        <span className='ml-2 text-sm'>{propertyData.propertyFeatures.bathrooms} Bathrooms</span>
                    </div>
                    <div>
                        <i className="fa-solid fa-bars"></i>
                        <span className='ml-2 text-sm'>{propertyData.propertyFeatures.length} x {propertyData.propertyFeatures.width} m<sup>2</sup></span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
