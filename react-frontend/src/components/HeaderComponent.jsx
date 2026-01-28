import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, PlusCircle, Leaf } from 'lucide-react'
import clsx from 'clsx'

const HeaderComponent = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <div className="sticky top-0 z-50 bg-white border-b border-surface-border shadow-sm">
            <header className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Leaf size={18} className="text-white" />
                    </div>
                    <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight">
                        EcoPulse <span className="text-primary-600">Workforce</span>
                    </Link>
                </div>

                <nav>
                    <ul className="flex items-center gap-1">
                        <li>
                            <Link to="/employees" className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                                isActive('/employees')
                                    ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}>
                                <Users size={16} />
                                Staff
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-employee/_add" className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                                isActive('/add-employee/_add')
                                    ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}>
                                <PlusCircle size={16} />
                                Onboard
                            </Link>
                        </li>
                        <div className="w-px h-6 bg-slate-200 mx-2"></div>
                        <li>
                            <Link to="/carbon-dashboard" className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                                isActive('/carbon-dashboard')
                                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/30"
                                    : "text-slate-500 hover:text-primary-600 hover:bg-primary-50"
                            )}>
                                <LayoutDashboard size={16} />
                                Insights
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
