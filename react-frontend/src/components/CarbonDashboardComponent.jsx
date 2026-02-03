import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Wind, Building2, Users, Activity } from 'lucide-react';

const AnimatedGlobe = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.9} />
            <directionalLight position={[10, 10, 5]} intensity={1.0} />
            <Sphere visible args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial
                    color="#10b981" // Emerald
                    attach="material"
                    distort={0.3}
                    speed={1.0}
                    roughness={0.5}
                    metalness={0.1}
                />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
    );
};

const CarbonDashboardComponent = () => {
    const [dashboardData, setDashboardData] = useState({
        totalEmissions: 0,
        departmentEmissions: {},
        employeeCount: 0
    });
    const [simulationResult, setSimulationResult] = useState(null);
    const [maxOnsiteDays, setMaxOnsiteDays] = useState(3);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/carbon/dashboard')
            .then(res => setDashboardData(res.data))
            .catch(err => console.error("Error fetching dashboard data:", err));
    }, []);

    const handleSimulate = () => {
        axios.post('http://localhost:8080/api/v1/carbon/simulate', { maxOnsiteDays })
            .then(res => setSimulationResult(res.data));
    };

    const chartData = Object.entries(dashboardData.departmentEmissions).map(([name, value]) => ({
        name,
        emissions: value
    }));

    // Light Mode Palette
    const COLORS = ['#0284c7', '#4f46e5', '#10b981', '#d97706', '#db2777'];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <Activity className="text-primary-600" />
                    Sustainability Intelligence
                </h1>
                <p className="text-slate-500 mt-1 max-w-2xl">
                    Live telemetry of organizational carbon footprint and workforce impact metrics.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Primary Metric */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-primary-100"></div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                            <Leaf size={24} />
                        </div>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Total Footprint</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">{dashboardData.totalEmissions.toLocaleString()}</span>
                        <span className="text-slate-500 ml-2">kg CO₂e / yr</span>
                    </div>
                </div>

                {/* Workforce Metric */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-sky-100"></div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
                            <Users size={24} />
                        </div>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Active Workforce</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">{dashboardData.employeeCount}</span>
                        <span className="text-slate-500 ml-2">Employees</span>
                    </div>
                </div>

                {/* Avg Metric */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-100"></div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                            <TrendingDown size={24} />
                        </div>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Intensity</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">
                            {dashboardData.employeeCount > 0 ? (dashboardData.totalEmissions / dashboardData.employeeCount).toFixed(0) : 0}
                        </span>
                        <span className="text-slate-500 ml-2">kg / employee</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Building2 size={20} className="text-slate-400" />
                        Emission Breakdown by Department
                    </h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f1f5f9', opacity: 1 }}
                                />
                                <Bar dataKey="emissions" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Simulation & 3D Section */}
                <div className="space-y-6">
                    {/* 3D Visual - Lighter Background */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 h-48 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatedGlobe />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary-700 border border-primary-200">
                            Live Model
                        </div>
                    </div>

                    {/* Simulator */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Wind size={18} className="text-slate-400" />
                                Policy Simulator
                            </h3>
                        </div>

                        <div className="mb-6">
                            <label className="block text-slate-500 text-xs uppercase font-bold tracking-wider mb-3">Hybrid Cap (Days Onsite)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={maxOnsiteDays}
                                    onChange={(e) => setMaxOnsiteDays(parseInt(e.target.value))}
                                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <span className="text-2xl font-bold text-slate-900 w-8 text-center">{maxOnsiteDays}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSimulate}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-colors mb-6 shadow-md"
                        >
                            Analyze Impact
                        </button>

                        {simulationResult && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t border-slate-100 pt-4"
                            >
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-slate-500 text-sm">Potential Savings</span>
                                    <span className="text-emerald-600 text-xl font-bold">{simulationResult.reductionPercentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${simulationResult.reductionPercentage}%` }}
                                        transition={{ duration: 1 }}
                                        className="bg-emerald-500 h-full"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2 text-right">
                                    -{simulationResult.reduction.toFixed(0)} kg CO₂e
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarbonDashboardComponent;
