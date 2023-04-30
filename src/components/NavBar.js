import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {

    const router = useRouter()
    const pathname  = router.pathname


    const navigation = [
        { name: 'List of Tasks', href: '/', current: (pathname === '/') ? true : false  },
        { name: 'Create Task', href: '/tasks/new', current: pathname.startsWith('/tasks/new') },
        { name: 'Edit Task', href: '/', current: pathname.endsWith('/edit') }
    ]


    return (
        <div as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}

                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={
                                            item.current ? 'rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white'
                                                : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex items-center relative ml-3">
                            <button
                                className="mr-6 px-3 py-1 bg-sky-600 font-semibold text-slate-100 rounded"
                                onClick={() => router.push('/tasks/new')}>
                                + New Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}