import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { Save, X, User, Briefcase, MapPin } from 'lucide-react'

const CreateEmployeeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [department, setDepartment] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [commuteDistance, setCommuteDistance] = useState('');
    const [weeklyOnsiteDays, setWeeklyOnsiteDays] = useState('');

    useEffect(() => {
        if (id !== '_add') {
            EmployeeService.getEmployeeById(id).then((res) => {
                let e = res.data;
                setFirstName(e.firstName);
                setLastName(e.lastName);
                setEmailId(e.emailId);
                setDepartment(e.department);
                setWorkMode(e.workMode);
                setCommuteDistance(e.commuteDistance);
                setWeeklyOnsiteDays(e.weeklyOnsiteDays);
            });
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName, lastName, emailId,
            department, workMode,
            commuteDistance, weeklyOnsiteDays
        };

        if (id === '_add') {
            EmployeeService.createEmployee(employee).then(() => navigate('/employees'));
        } else {
            EmployeeService.updateEmployee(employee, id).then(() => navigate('/employees'));
        }
    }

    const cancel = () => navigate('/employees');
    const isAdd = id === '_add';

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-3xl">
                <div className="mb-6">
                    <button onClick={cancel} className="text-slate-500 hover:text-primary-600 text-sm flex items-center gap-1 mb-2 transition-colors font-medium">
                        &larr; Back to Directory
                    </button>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isAdd ? 'New Personnel Entry' : 'Edit Personnel Profile'}
                    </h2>
                    <p className="text-slate-500 text-sm">Fill in the details below to update the system records.</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <form className="divide-y divide-slate-100">
                        {/* Section 1: Basic Info */}
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-6 text-primary-600 font-semibold text-sm uppercase tracking-wider">
                                <User size={16} /> Identity & Contact
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                    <input placeholder="Ex: Sarah" name="firstName" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-400"
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                    <input placeholder="Ex: Conner" name="lastName" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-400"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input placeholder="sarah.conner@ecopulse.com" name="emailId" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-400"
                                        value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Role & Department */}
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-6 text-primary-600 font-semibold text-sm uppercase tracking-wider">
                                <Briefcase size={16} /> Role & Allocation
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                                    <input placeholder="Ex: R&D, Logistics, HR" name="department" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-400"
                                        value={department} onChange={(e) => setDepartment(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Work Mode</label>
                                    <div className="relative">
                                        <select className="appearance-none w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" name="workMode"
                                            value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                                            <option value="">Select Assignment...</option>
                                            <option value="REMOTE">Remote (100% Offsite)</option>
                                            <option value="HYBRID">Hybrid (Flexible)</option>
                                            <option value="ONSITE">Onsite (100% In-Office)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Sustainability Metrics */}
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-6 text-emerald-600 font-semibold text-sm uppercase tracking-wider">
                                <MapPin size={16} /> Impact Metrics
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">One-Way Commute (km)</label>
                                    <input type="number" placeholder="20" name="commuteDistance" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-400"
                                        value={commuteDistance} onChange={(e) => setCommuteDistance(e.target.value)} />
                                    <p className="mt-1 text-xs text-slate-500">Used for Scope 3 emission calculation.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Average Weekly Onsite Days</label>
                                    <input type="number" min="0" max="5" placeholder="3" name="weeklyOnsiteDays" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-400"
                                        value={weeklyOnsiteDays} onChange={(e) => setWeeklyOnsiteDays(e.target.value)} />
                                    <p className="mt-1 text-xs text-slate-500">Affects facility energy allocation.</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 p-6 flex justify-end gap-3 border-t border-slate-200">
                            <button type="button" className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all font-medium flex items-center gap-2 bg-white" onClick={cancel}>
                                <X size={18} /> Discard
                            </button>
                            <button type="button" className="px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 transition-all font-medium flex items-center gap-2" onClick={saveOrUpdateEmployee}>
                                <Save size={18} /> Save Record
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployeeComponent
