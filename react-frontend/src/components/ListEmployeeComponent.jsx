import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'
import { Edit2, Trash2, Eye, UserPlus, Loader, Search, Filter } from 'lucide-react'

const ListEmployeeComponent = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data);
            setLoading(false);
        });
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(res => {
            setEmployees(employees.filter(employee => employee.id !== id));
        });
    }

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader className="animate-spin text-primary-600" size={48} />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Workforce Directory</h2>
                    <p className="text-slate-500 mt-1">Manage employee profiles and sustainability metrics.</p>
                </div>
                <button
                    onClick={() => navigate('/add-employee/_add')}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all font-medium"
                >
                    <UserPlus size={18} />
                    Add Employee
                </button>
            </div>

            {/* Filter/Search Bar */}
            <div className="bg-white rounded-t-xl p-4 border-b border-surface-border flex gap-4 shadow-sm border-x border-t">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-400"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-sm font-medium bg-white">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-b-xl border border-x border-b border-surface-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b border-surface-border">
                            <tr>
                                <th className="p-5 pl-6">Employee</th>
                                <th className="p-5">Contact</th>
                                <th className="p-5">Department</th>
                                <th className="p-5">Work Mode</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                employees.map(
                                    employee =>
                                        <tr key={employee.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-5 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-sm font-bold text-primary-600 border border-primary-100">
                                                        {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{employee.firstName} {employee.lastName}</div>
                                                        <div className="text-xs text-slate-500">ID: #{employee.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-600 text-sm"> {employee.emailId}</td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                                    {employee.department || 'General'}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${employee.workMode === 'REMOTE' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                        employee.workMode === 'HYBRID' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${employee.workMode === 'REMOTE' ? 'bg-indigo-500' :
                                                            employee.workMode === 'HYBRID' ? 'bg-purple-500' :
                                                                'bg-emerald-500'
                                                        }`}></span>
                                                    {employee.workMode || 'ONSITE'}
                                                </span>
                                            </td>
                                            <td className="p-5 text-center">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => navigate(`/add-employee/${employee.id}`)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => deleteEmployee(employee.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button onClick={() => navigate(`/view-employee/${employee.id}`)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                                                        <Eye size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {employees.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Search size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-1">No employees found</h3>
                            <p className="text-sm">Get started by onboarding your first team member.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListEmployeeComponent
