import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

import {
  FileText,
  Download,
  Eye,
  FolderOpen,
  Users,
  CheckCircle
} from "lucide-react";

function ResumeManagement() {

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume");
      setResumes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (

<div className="flex bg-slate-50 min-h-screen">

<Sidebar />

<div className="flex-1">

<Navbar />

<main className="p-8">

<div className="flex justify-between items-center mb-10">

<div>

<h1 className="text-4xl font-bold text-slate-900">
Resume Management
</h1>

<p className="text-slate-500 mt-2">
Manage all uploaded student resumes.
</p>

</div>

<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
Resume Analytics
</button>

</div>

{/* KPI */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

<div className="bg-white rounded-2xl shadow p-6">

<p className="text-slate-500">
Total Resumes
</p>

<h2 className="text-4xl font-bold mt-3 text-blue-600">
{resumes.length}
</h2>

</div>

<div className="bg-white rounded-2xl shadow p-6">

<p className="text-slate-500">
Uploaded
</p>

<h2 className="text-4xl font-bold mt-3 text-green-600">
{resumes.length}
</h2>

</div>

<div className="bg-white rounded-2xl shadow p-6">

<p className="text-slate-500">
Verified
</p>

<h2 className="text-4xl font-bold mt-3 text-purple-600">
{resumes.length}
</h2>

</div>

<div className="bg-white rounded-2xl shadow p-6">

<p className="text-slate-500">
Status
</p>

<h2 className="text-4xl font-bold mt-3 text-orange-500">
Active
</h2>

</div>

</div>

{/* Table */}

<div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

<div className="flex justify-between items-center p-6 border-b">

<div>

<h2 className="text-2xl font-bold">
Uploaded Resumes
</h2>

<p className="text-slate-500 mt-1">
Student resume repository
</p>

</div>

<div className="flex gap-3">

<button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
Export
</button>

<button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
Refresh
</button>

</div>

</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-slate-100 text-slate-700">

<tr>

<th className="p-5 text-left">
Resume
</th>

<th className="p-5 text-left">
Student
</th>

<th className="p-5 text-left">
Uploaded
</th>

<th className="p-5 text-left">
Status
</th>

<th className="p-5 text-center">
Actions
</th>

</tr>

</thead>


  <tbody>

{resumes.length === 0 ? (

<tr>

<td
colSpan="5"
className="py-20 text-center"
>

<div className="flex flex-col items-center">

<FolderOpen
size={64}
className="text-slate-300"
/>

<h3 className="text-2xl font-bold mt-6 text-slate-700">
No Resumes Uploaded
</h3>

<p className="text-slate-500 mt-2">
Uploaded resumes will appear here.
</p>

</div>

</td>

</tr>

) : (

resumes.map((resume) => (

<tr
key={resume.id}
className="border-b hover:bg-slate-50 transition"
>

<td className="p-5">

<div className="flex items-center gap-4">

<div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

<FileText
size={22}
className="text-blue-600"
/>

</div>

<div>

<p className="font-semibold">
#{resume.id}
</p>

<p className="text-sm text-slate-500">
{resume.fileName}
</p>

</div>

</div>

</td>

<td className="p-5">

<div>

<p className="font-semibold">
Student #{resume.studentId}
</p>

<p className="text-sm text-slate-500">
CampusConnect
</p>

</div>

</td>

<td className="p-5 text-slate-600">

{new Date(
resume.uploadedAt
).toLocaleString()}

</td>

<td className="p-5">

<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

<CheckCircle size={16} />

Uploaded

</span>

</td>

<td className="p-5">

<div className="flex justify-center gap-3">

<a
href={`http://localhost:8080/api/resume/view/${resume.studentId}`}
target="_blank"
rel="noreferrer"
className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition"
>

<Eye size={18} />

View

</a>

<a
href={`http://localhost:8080/api/resume/download/${resume.studentId}`}
className="h-10 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition"
>

<Download size={18} />

Download

</a>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</main>

<Footer />

</div>

</div>

);

}

export default ResumeManagement;