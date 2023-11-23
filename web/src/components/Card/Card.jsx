import { Card } from 'flowbite-react';

export default function CardComponent() {
    return (
        <Card
            className="max-w-sm"
            renderImage={() => <img width={500} height={500} src="/images/blog/image-1.jpg" alt="image 1" />}
        >
            <div>
                <span className='text-lg text-purple-600 font-semibold'>Rs. 5000</span>/month
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
        </Card>
    )
}
