'use client';

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFirestore, useUser, useCollection, useDoc, useMemoFirebase, useAuth } from "@/firebase";
import { collection, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Plus, Trash2, LayoutDashboard, Briefcase, Code2, Loader2, User, Save, Edit3, X, Eye, FileCode, Sparkles, ExternalLink, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

/**
 * @fileOverview Administrative Console (CMS) for managing portfolio content.
 * Handles Profile, Projects, and Experience management with real-time Firestore sync.
 */
export default function CMSPage() {
  const db = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fallback to "ahsan" if not logged in, but the UI restricts access anyway
  const OWNER_ID = user?.uid || "ahsan";

  const projectsQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc')), [db, OWNER_ID]);
  const experienceQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc')), [db, OWNER_ID]);
  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db, OWNER_ID]);

  const { data: projects } = useCollection(projectsQuery);
  const { data: experiences } = useCollection(experienceQuery);
  const { data: profile } = useDoc(profileRef);

  const handleLogin = () => {
    initiateAnonymousSignIn(auth);
  };

  const ensureProfileExists = () => {
    setDocumentNonBlocking(profileRef, { 
      id: OWNER_ID, 
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  };

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast({ title: "Please sign in first", variant: "destructive" });

    const formData = new FormData(e.currentTarget);
    const data = {
      id: OWNER_ID,
      name: formData.get('name') as string,
      headline: formData.get('headline') as string,
      bio: formData.get('bio') as string,
      contactEmail: formData.get('contactEmail') as string,
      resumeUrl: formData.get('resumeUrl') as string,
      lastUpdated: serverTimestamp(),
    };
    
    setDocumentNonBlocking(profileRef, data, { merge: true });
    toast({ title: "Profile updated successfully!" });
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast({ title: "Please sign in first", variant: "destructive" });

    ensureProfileExists();

    const formData = new FormData(e.currentTarget);
    const id = editingId || crypto.randomUUID();
    
    const projectData = {
      id,
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      problem: formData.get('problem') as string,
      solution: formData.get('solution') as string,
      roiMetric: formData.get('roiMetric') as string,
      businessImpact: formData.get('businessImpact') as string,
      projectLink: formData.get('projectLink') as string,
      githubLink: formData.get('githubLink') as string,
      architecture: formData.get('architecture') as string,
      codeSnippet: formData.get('codeSnippet') as string,
      techStack: (formData.get('technologies') as string).split(',').map(s => s.trim()),
      imageUrl: formData.get('imageUrl') as string || `https://picsum.photos/seed/${id}/1200/630`,
      order: editingId ? (projects?.find(p => p.id === id)?.order ?? 0) : (projects?.length || 0),
      updatedAt: serverTimestamp(),
    };

    setDocumentNonBlocking(doc(db, 'users', OWNER_ID, 'projects', id), projectData, { merge: true });
    toast({ title: editingId ? "Project updated!" : "Project published!" });
    setEditingId(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast({ title: "Please sign in first", variant: "destructive" });

    ensureProfileExists();

    const formData = new FormData(e.currentTarget);
    const id = editingId || crypto.randomUUID();

    const expData = {
      id,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      period: formData.get('period') as string,
      desc: formData.get('desc') as string,
      order: editingId ? (experiences?.find(ex => ex.id === id)?.order ?? 0) : (experiences?.length || 0),
      updatedAt: serverTimestamp(),
    };

    setDocumentNonBlocking(doc(db, 'users', OWNER_ID, 'experiences', id), expData, { merge: true });
    toast({ title: editingId ? "Experience updated!" : "Experience added!" });
    setEditingId(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleDelete = (path: string) => {
    if (!user) return toast({ title: "Please sign in first", variant: "destructive" });
    if (!confirm("Are you sure? This cannot be undone.")) return;
    deleteDocumentNonBlocking(doc(db, path));
    toast({ title: "Deleted successfully." });
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-background dot-pattern flex items-center justify-center p-6">
        <Navigation />
        <Card className="glass-card max-w-md w-full p-8 text-center space-y-6 rounded-[2.5rem] animate-fade-in-up">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <ShieldAlert size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-tight">Access Restricted</h1>
            <p className="text-muted-foreground text-sm">Please sign in to your administrative account to manage portfolio content.</p>
          </div>
          <Button onClick={handleLogin} size="lg" className="w-full h-14 font-black uppercase tracking-widest rounded-2xl">
            Authorize via Studio
          </Button>
        </Card>
      </div>
    );
  }

  const editingProject = projects?.find(p => p.id === editingId);
  const editingExperience = experiences?.find(ex => ex.id === editingId);

  return (
    <div className="min-h-screen bg-background dot-pattern pt-32 pb-20">
      <Navigation />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase">Editorial Studio</h1>
              <p className="text-muted-foreground text-sm font-medium">Firebase Content Engine • Connected as {user.email || 'Admin'}</p>
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/5 h-12">
                <Link href="/"><ExternalLink size={16} className="mr-2" /> View Site</Link>
             </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-8 animate-fade-in-up">
          <TabsList className="bg-white/5 border border-white/10 p-1.5 h-14 rounded-2xl w-full md:w-fit">
            <TabsTrigger value="profile" className="rounded-xl px-8 gap-2 data-[state=active]:bg-primary h-full">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl px-8 gap-2 data-[state=active]:bg-primary h-full">
              <Code2 size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="rounded-xl px-8 gap-2 data-[state=active]:bg-primary h-full">
              <Briefcase size={16} /> Career
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl flex items-center gap-2 font-black uppercase tracking-tighter">
                  <User size={20} className="text-primary" /> Identity Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSaveProfile} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Public Name</label>
                      <Input name="name" defaultValue={profile?.name} placeholder="Your Full Name" required className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Direct Email</label>
                      <Input name="contactEmail" type="email" defaultValue={profile?.contactEmail} placeholder="hello@example.dev" required className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Professional Headline</label>
                      <Input name="headline" defaultValue={profile?.headline} placeholder="Senior Software Engineer & AI Architect" required className="bg-white/5 border-white/10 h-14 rounded-2xl font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Resume Link (PDF)</label>
                      <Input name="resumeUrl" defaultValue={profile?.resumeUrl} placeholder="https://drive.google.com/..." className="bg-white/5 border-white/10 h-14 rounded-2xl font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Biographical Narrative</label>
                    <Textarea name="bio" defaultValue={profile?.bio} placeholder="Tell your story..." className="bg-white/5 border-white/10 min-h-[200px] rounded-3xl p-6 text-base leading-relaxed" />
                  </div>
                  <Button type="submit" className="w-full h-16 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 text-sm">
                    <Save size={20} className="mr-3" /> Commit Profile Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl flex items-center gap-2 font-black uppercase tracking-tighter">
                  {editingId ? <Edit3 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                  {editingId ? "Modify Existing Case Study" : "Draft New Case Study"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSaveProject} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">01 // Identity</span>
                       <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Project Title</label>
                        <Input name="title" defaultValue={editingProject?.title} placeholder="e.g. Nexus SaaS Engine" required className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Technologies (Comma separated)</label>
                        <Input name="technologies" defaultValue={editingProject?.techStack?.join(', ')} placeholder="React, Next.js, Firebase" required className="bg-white/5 border-white/10 h-14 rounded-2xl font-medium" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">02 // Assets & Links</span>
                       <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live URL</label>
                        <Input name="projectLink" defaultValue={editingProject?.projectLink} placeholder="https://..." className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Repository URL</label>
                        <Input name="githubLink" defaultValue={editingProject?.githubLink} placeholder="https://github.com/..." className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Cover Image URL</label>
                        <Input name="imageUrl" defaultValue={editingProject?.imageUrl} placeholder="https://picsum.photos/..." className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">03 // High Fidelity Content</span>
                       <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Value Statement (One Line)</label>
                      <Input name="description" defaultValue={editingProject?.description} placeholder="The 'Elevator Pitch' for this project" required className="bg-white/5 border-white/10 h-14 rounded-2xl font-medium" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">The Core Problem</label>
                        <Textarea name="problem" defaultValue={editingProject?.problem} placeholder="Describe the engineering challenge..." className="bg-white/5 border-white/10 min-h-[160px] rounded-3xl p-6 leading-relaxed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Technical Solution</label>
                        <Textarea name="solution" defaultValue={editingProject?.solution} placeholder="Describe your architectural approach..." className="bg-white/5 border-white/10 min-h-[160px] rounded-3xl p-6 leading-relaxed" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Architecture Diagram/Overview</label>
                        <Textarea name="architecture" defaultValue={editingProject?.architecture} placeholder="Explain the system design..." className="bg-white/5 border-white/10 min-h-[140px] rounded-3xl p-6 font-mono text-xs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Core Code Snippet</label>
                        <Textarea name="codeSnippet" defaultValue={editingProject?.codeSnippet} placeholder="export const logic = () => ..." className="bg-white/5 border-white/10 min-h-[140px] rounded-3xl p-6 font-mono text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">04 // Measurable Impact</span>
                       <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Business Outcome</label>
                        <Input name="businessImpact" defaultValue={editingProject?.businessImpact} placeholder="e.g. 40% Increase in Retention" className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Core KPI / ROI Metric</label>
                        <Input name="roiMetric" defaultValue={editingProject?.roiMetric} placeholder="e.g. $500k ARR Saved" className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="flex-1 h-16 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 text-sm">
                      <Save size={20} className="mr-3" /> {editingId ? "Update Published Project" : "Publish to Production"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-16 w-16 rounded-2xl border-white/10 bg-white/5">
                        <X size={24} />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                <Sparkles size={14} className="text-primary" /> Active Content Inventory
              </h3>
              <div className="grid gap-4">
                {projects?.map(p => (
                  <div key={p.id} className="glass-card p-6 rounded-[2rem] border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all shadow-xl">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
                        <img src={p.imageUrl} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg uppercase tracking-tight">{p.title}</h4>
                        <div className="flex items-center gap-3">
                           <p className="text-[10px] text-primary uppercase font-black tracking-widest">{p.businessImpact || 'Impact Pending'}</p>
                           <span className="text-white/10">•</span>
                           <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{p.techStack?.slice(0, 2).join(' + ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(p.id)} className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-12 w-12 rounded-xl">
                        <Edit3 size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/projects/${p.id}`)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 w-12 rounded-xl">
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl flex items-center gap-2 font-black uppercase tracking-tighter">
                  {editingId ? <Edit3 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                  {editingId ? "Modify Career Entry" : "Register Career Milestone"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSaveExperience} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Company / Institution</label>
                      <Input name="company" defaultValue={editingExperience?.company} placeholder="e.g. Cloudfort" required className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Professional Role</label>
                      <Input name="role" defaultValue={editingExperience?.role} placeholder="e.g. Web Developer" required className="bg-white/5 border-white/10 h-14 rounded-2xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Duration (Label)</label>
                    <Input name="period" defaultValue={editingExperience?.period} placeholder="e.g. Nov 2024 — Present" required className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Impact Highlights</label>
                    <Textarea name="desc" defaultValue={editingExperience?.desc} placeholder="Architected scalable platforms..." required className="bg-white/5 border-white/10 min-h-[240px] rounded-3xl p-6 text-base leading-relaxed" />
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="flex-1 h-16 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 text-sm">
                      <Save size={20} className="mr-3" /> {editingId ? "Update Career Records" : "Commit to Timeline"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-16 w-16 rounded-2xl border-white/10 bg-white/5">
                        <X size={24} />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                <Briefcase size={14} className="text-primary" /> Career Records Track
              </h3>
              <div className="grid gap-4">
                {experiences?.map(ex => (
                  <div key={ex.id} className="glass-card p-6 rounded-[2rem] border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all shadow-xl">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                         <Briefcase size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg uppercase tracking-tight">{ex.role}</h4>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{ex.company} • {ex.period}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(ex.id)} className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-12 w-12 rounded-xl">
                        <Edit3 size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/experiences/${ex.id}`)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 w-12 rounded-xl">
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
