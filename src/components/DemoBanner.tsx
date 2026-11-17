import Link from "next/link"

const DemoBanner = () => {
    return (
        <div className="flex justify-between gap-10 items-center py-0.5 px-4 md:px-8 bg-red-100 mb-2">
            <p className="text-wrap text-xs italic text-red-500">Demo project: a portfolio site with a fictional organisation. No real donations are collected.</p>
            <Link className="text-xs text-nowrap" href="https://github.com/T-tech26/kindly-hub.git" target="_blank" rel="noopener noreferrer">
                View source
            </Link>
        </div>
    )
}

export default DemoBanner