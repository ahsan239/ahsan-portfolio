'use client';

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tabs";
import { useFirestore, useUser, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, doc, query, orderBy } from "firebase/firestore";
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Plus, Trash2, LayoutDashboard, Briefcase, Code2, Loader2, User, Save, Edit3, X, Calendar, Globe, Github } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OWNER_ID = "alex-rivera";

export default function CMSPage() {
  const db = useFirestore();
  const { isUserLoading } = useUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  const projectsQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc')), [db]);
  const experienceQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc')), [db]);
  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db]);

  const { data: projects } = useCollection(projectsQuery);
  const { data: experiences } = useCollection(experienceQuery);
  const { data: profile } = useDoc(profileRef);

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: OWNER_ID,
      name: formData.get('name') as string,
      headline: formData.get('headline') as string,
      bio: formData.get('bio') as string,
      contactEmail: formData.get('contactEmail') as string,
    };
    
    setDocumentNonBlocking(profileRef, data, { merge: true });
    toast({ title: "Profile updated successfully!" });
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingId || crypto.randomUUID();
    
    const projectData = {
      id,
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      summary: formData.get('summary') as string,
      problem: formData.get('problem') as string,
      solution: formData.get('solution') as string,
      roiMetric: formData.get('roiMetric') as string,
      businessImpact: formData.get('businessImpact') as string,
      projectLink: formData.get('projectLink') as string,
      githubLink: formData.get('githubLink') as string,
      technologies: (formData.get('technologies') as string).split(',').map(s => s.trim()),
      imageUrl: formData.get('imageUrl') as string || `https://picsum.photos/seed/${id}/1200/630`,
      publishedAt: new Date().toISOString(),
      order: editingId ? (projects?.find(p => p.id === id)?.order ?? 0) : (projects?.length || 0),
    };

    setDocumentNonBlocking(doc(db, 'users', OWNER_ID, 'projects', id), projectData, { merge: true });
    toast({ title: editingId ? "Project updated!" : "Project published!" });
    setEditingId(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingId || crypto.randomUUID();

    const expData = {
      id,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      duration: formData.get('duration') as string,
      points: (formData.get('points') as string).split('\n').filter(p => p.trim() !== ''),
      order: editingId ? (experiences?.find(ex => ex.id === id)?.order ?? 0) : (experiences?.length || 0)
    };

    setDocumentNonBlocking(doc(db, 'users', OWNER_ID, 'experiences', id), expData, { merge: true });
    toast({ title: editingId ? "Experience updated!" : "Experience added!" });
    setEditingId(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleDelete = (path: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    deleteDocumentNonBlocking(doc(db, path));
    toast({ title: "Deleted successfully." });
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background dot-pattern pt-32 pb-20">
      <Navigation />
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Dashboard CMS</h1>
            <p className="text-muted-foreground text-sm font-medium">Manage your professional identity and portfolio content.</p>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl">
            <TabsTrigger value="profile" className="rounded-xl px-6 gap-2">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl px-6 gap-2">
              <Code2 size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="rounded-xl px-6 gap-2">
              <Briefcase size={16} /> Career
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User size={20} className="text-primary" /> Global Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Name</label>
                      <Input name="name" defaultValue={profile?.name} placeholder="Your Full Name" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email</label>
                      <Input name="contactEmail" type="email" defaultValue={profile?.contactEmail} placeholder="hello@example.dev" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Headline</label>
                    <Input name="headline" defaultValue={profile?.headline} placeholder="Senior Software Engineer & AI Architect" required className="bg-white/5 border-white/10 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bio / About</label>
                    <Textarea name="bio" defaultValue={profile?.bio} placeholder="Tell your story..." className="bg-white/5 border-white/10 min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full h-12 font-black uppercase tracking-widest rounded-xl">
                    <Save size={18} className="mr-2" /> Save Profile Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {editingId ? <Edit3 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                  {editingId ? "Edit Project" : "Add New Case Study"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Title</label>
                      <Input name="title" defaultValue={projects?.find(p => p.id === editingId)?.title} placeholder="Project Title" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Technologies (comma separated)</label>
                      <Input name="technologies" defaultValue={projects?.find(p => p.id === editingId)?.technologies?.join(', ')} placeholder="React, Next.js, Node.js" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Demo Link</label>
                      <Input name="projectLink" defaultValue={projects?.find(p => p.id === editingId)?.projectLink} placeholder="https://demo.example.com" className="bg-white/5 border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">GitHub Link</label>
                      <Input name="githubLink" defaultValue={projects?.find(p => p.id === editingId)?.githubLink} placeholder="https://github.com/..." className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Summary (One-liner)</label>
                    <Input name="summary" defaultValue={projects?.find(p => p.id === editingId)?.summary} placeholder="A brief, impactful overview..." required className="bg-white/5 border-white/10 h-12" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Business Impact</label>
                      <Input name="businessImpact" defaultValue={projects?.find(p => p.id === editingId)?.businessImpact} placeholder="e.g. 35% Efficiency Increase" className="bg-white/5 border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">ROI Metric</label>
                      <Input name="roiMetric" defaultValue={projects?.find(p => p.id === editingId)?.roiMetric} placeholder="e.g. $2M Volume Processed" className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">The Problem</label>
                    <Textarea name="problem" defaultValue={projects?.find(p => p.id === editingId)?.problem} placeholder="What was the core challenge?" className="bg-white/5 border-white/10 min-h-[100px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">The Solution</label>
                    <Textarea name="solution" defaultValue={projects?.find(p => p.id === editingId)?.solution} placeholder="How did you solve it technically?" className="bg-white/5 border-white/10 min-h-[100px]" />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 h-12 font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20">
                      {editingId ? "Update Case Study" : "Publish Case Study"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-12 w-12 rounded-xl border-white/10">
                        <X size={20} />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Active Case Studies</h3>
              <div className="grid gap-3">
                {projects?.map(p => (
                  <div key={p.id} className="glass-card p-4 rounded-2xl border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-black/20 border border-white/5">
                        <img src={p.imageUrl} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                        <h4 className="font-bold">{p.title}</h4>
                        <p className="text-[10px] text-primary uppercase font-black tracking-widest">{p.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(p.id)} className="text-muted-foreground hover:text-primary rounded-lg">
                        <Edit3 size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/projects/${p.id}`)} className="text-muted-foreground hover:text-destructive rounded-lg">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-white/10 overflow-hidden rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {editingId ? <Edit3 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                  {editingId ? "Edit Career Entry" : "New Career Entry"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveExperience} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Company</label>
                      <Input name="company" defaultValue={experiences?.find(ex => ex.id === editingId)?.company} placeholder="e.g. Google" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Role</label>
                      <Input name="role" defaultValue={experiences?.find(ex => ex.id === editingId)?.role} placeholder="e.g. Senior Backend Engineer" required className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Duration</label>
                    <Input name="duration" defaultValue={experiences?.find(ex => ex.id === editingId)?.duration} placeholder="e.g. Jan 2021 — Present" required className="bg-white/5 border-white/10 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Impact Points (one per line)</label>
                    <Textarea name="points" defaultValue={experiences?.find(ex => ex.id === editingId)?.points?.join('\n')} placeholder="Reduced latency by 40%..." required className="bg-white/5 border-white/10 min-h-[150px]" />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 h-12 font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20">
                      {editingId ? "Update Experience" : "Add to Timeline"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-12 w-12 rounded-xl border-white/10">
                        <X size={20} />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Career Timeline</h3>
              <div className="grid gap-3">
                {experiences?.map(ex => (
                  <div key={ex.id} className="glass-card p-4 rounded-2xl border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                    <div>
                      <h4 className="font-bold">{ex.role}</h4>
                      <p className="text-xs text-primary font-medium">{ex.company} • {ex.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(ex.id)} className="text-muted-foreground hover:text-primary rounded-lg">
                        <Edit3 size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/experiences/${ex.id}`)} className="text-muted-foreground hover:text-destructive rounded-lg">
                        <Trash2 size={18} />
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
