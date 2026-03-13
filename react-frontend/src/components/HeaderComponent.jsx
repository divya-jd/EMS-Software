import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, PlusCircle, Leaf, LogOut, LogIn } from 'lucide-react'
import clsx from 'clsx'
import AuthService from '../services/AuthService'

const HeaderComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuth = AuthService.isUserLoggedIn();
    const isAdmin = AuthService.isAdmin();
    const userName = AuthService.getName();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    }

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
                        {isAuth ? (
                            <>
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
                                {isAdmin && (
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
                                )}
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
                                <div className="w-px h-6 bg-slate-200 mx-2"></div>
                                <li className="flex items-center gap-3 ml-2">
                                    <div className="flex flex-col items-end hidden md:flex">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Signed in as</span>
                                        <span className="text-xs font-bold text-slate-900">{userName || 'User'}</span>
                                    </div>
                                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-all text-sm font-medium border border-red-100" title="Logout">
                                        <LogOut size={16} />
                                        <span className="hidden md:inline">Exit</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-sm font-medium shadow-md">
                                    <LogIn size={16} />
                                    Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
