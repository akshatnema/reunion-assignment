import { Card } from 'flowbite-react';

export default function CardComponent({ propertyData = {} }) {
    console.log(propertyData.imageUrl)
    return (
        <Card
            className="max-w-sm h-full"
            renderImage={() => <img width={350} height={300} src={`${propertyData.imageUrl}`} alt="image 1" />}
        >
            <div className='flex-1'>
                <div>
                    <span className='text-lg text-purple-600 font-semibold'>Rs. {propertyData.pricePerMonth}</span>/month
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {propertyData.name}
                </h5>
                <p className="font-normal text-gray-700">
                    {propertyData.location}
                </p>
            </div>
            <div className=''>
                <hr />
                <div className='flex justify-between pt-2'>
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
