import { ModeToggle } from "./ModeToggle";

type NaveProps = {
    className?: string
}

export default function Navi({ className }: NaveProps) {

    return (
        <header className={`${className} sticky top-0 z-50`}>
            <nav className="relative">
                {/* Blur*/}
                <div className="absolute inset-0 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm" aria-hidden="true" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 hover:cursor-pointer hover:scale-105 transition-scale duration-200 ease-in">
                            Control Web
                        </h1>
                        <div>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}