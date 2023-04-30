import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {

    return (
        <div className="bg-gray-200 fixed bottom-0 w-full px-2 sm:px-6 lg:px-8">
            <div className="flex items-center min-w-screen justify-center container mx-auto">
                <div className='my-2'>
                    Hecho por Juliancio. Más vale que ingreses sólo texto/emojis y no un código inmenso que rompa la app porque te busco y te parto las piernas. Acordate que puedo ver tu IP.
                </div>

            </div>
        </div>


    )
}