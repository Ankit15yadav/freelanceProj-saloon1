import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
    title: string
    subtitle?: string
    image: string
    imagePosition: "left" | "right"
    onBookNow?: () => void
}

export function ServiceCard({ title, subtitle, image, imagePosition, onBookNow }: ServiceCardProps) {
    return (
        <div className="border-2 border-gray-950 rounded-lg p-4 flex items-center">
            <div className={`flex w-full ${imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'} justify-between items-center`}>
                <div className="w-[300px]">
                    <Image src={image} alt={title} width={400} height={400} />
                </div>
                <div className="flex w-full flex-col gap-y-2 items-center justify-center text-center">
                    <h2 className="font-bold text-2xl">{title}</h2>
                    <p>{subtitle}</p>
                    <Button className="flex shadow-lg rounded-full mt-10 w-fit border-2 border-[#E5ABAB]" variant="outline" onClick={onBookNow}>
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
