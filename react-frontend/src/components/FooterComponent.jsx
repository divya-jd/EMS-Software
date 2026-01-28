import React from 'react'

const FooterComponent = () => {
    return (
        <footer className="border-t border-slate-200 bg-white mt-auto">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                <span>&copy; {new Date().getFullYear()} EcoPulse Workforce Systems. Enterprise Edition.</span>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Terms of Service</span>
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Support</span>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent
