import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import { ArrowLeft, User, Mail, Building, Briefcase, MapPin, Calendar } from 'lucide-react'

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then(res => {
            setEmployee(res.data);
        })
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl relative overflow-hidden">
                {/* Top Decoration */}
                <div className="h-32 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500 via-transparent to-transparent"></div>
                    <button
                        onClick={() => navigate('/employees')}
                        className="absolute top-6 left-6 p-2 text-slate-500 hover:text-slate-900 bg-white shadow-sm hover:shadow-md rounded-lg transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {/* Profile Header */}
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6 flex justify-between items-end">
                        <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                <User size={40} />
                            </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                            Active Employee
                        </span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-1">{employee.firstName} {employee.lastName}</h1>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Mail size={14} />
                            {employee.emailId}
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 text-primary-600 mb-2">
                                <Building size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</span>
                            </div>
                            <div className="text-lg font-semibold text-slate-900 pl-7">{employee.department || 'N/A'}</div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                <Briefcase size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Work Mode</span>
                            </div>
                            <div className="text-lg font-semibold text-slate-900 pl-7">{employee.workMode || 'N/A'}</div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <MapPin size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Commute</span>
                            </div>
                            <div className="text-lg font-semibold text-slate-900 pl-7">
                                {employee.commuteDistance ? `${employee.commuteDistance} km` : 'N/A'}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 text-orange-600 mb-2">
                                <Calendar size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Onsite Days</span>
                            </div>
                            <div className="text-lg font-semibold text-slate-900 pl-7">
                                {employee.weeklyOnsiteDays ?? 'N/A'} <span className="text-sm text-slate-400 font-normal">/ week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEmployeeComponent
