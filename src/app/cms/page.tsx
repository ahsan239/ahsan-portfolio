
'use client';

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, doc, setDoc, query, orderBy, deleteDoc } from "firebase/firestore";
import { Plus, Trash2, LayoutDashboard, Briefcase, Code2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OWNER_ID = "alex-rivera";

export default function CMSPage() {
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  // Queries
  const projectsQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc')), [db]);
  const experienceQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc')), [db]);

  const { data: projects } = useCollection(projectsQuery);
  const { data: experiences } = useCollection(experienceQuery);

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const id = crypto.randomUUID();
    
    const projectData = {
      id,
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      order: projects?.length || 0,
      techStack: (formData.get('techStack') as string).split(',').map(s => s.trim()),
      imageUrl: `https://picsum.photos/seed/${id}/1000/1000`
    };

    try {
      await setDoc(doc(db, 'users', OWNER_ID, 'projects', id), projectData);
      toast({ title: "Project added successfully!" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({ variant: "destructive", title: "Failed to add project." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const id = crypto.randomUUID();

    const expData = {
      id,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      period: formData.get('period') as string,
      desc: formData.get('desc') as string,
      order: experiences?.length || 0
    };

    try {
      await setDoc(doc(db, 'users', OWNER_ID, 'experiences', id), expData);
      toast({ title: "Experience added successfully!" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({ variant: "destructive", title: "Failed to add experience." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (path: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, path));
      toast({ title: "Deleted successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Delete failed." });
    }
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background dot-pattern pt-32 pb-20">
      <Navigation />
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio CMS</h1>
            <p className="text-muted-foreground">Manage your projects and professional experience.</p>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
            <TabsTrigger value="projects" className="rounded-lg px-6 gap-2">
              <Code2 size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="rounded-lg px-6 gap-2">
              <Briefcase size={16} /> Experience
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-8">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus size={18} className="text-primary" /> New Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <Input name="title" placeholder="Project Title" required className="bg-white/5 border-white/10" />
                  <Textarea name="description" placeholder="Short description..." required className="bg-white/5 border-white/10" />
                  <Input name="techStack" placeholder="Tech Stack (comma separated: React, Next.js, etc.)" className="bg-white/5 border-white/10" />
                  <Button type="submit" disabled={isSaving} className="w-full font-bold">
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Plus size={16} className="mr-2" />}
                    Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Current Projects</h3>
              {projects?.map(p => (
                <div key={p.id} className="glass-card p-4 rounded-xl border-white/5 flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-xs text-muted-foreground">{p.slug}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/projects/${p.id}`)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-8">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus size={18} className="text-primary" /> New Career Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddExperience} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="company" placeholder="Company Name" required className="bg-white/5 border-white/10" />
                    <Input name="role" placeholder="Job Role" required className="bg-white/5 border-white/10" />
                  </div>
                  <Input name="period" placeholder="Period (e.g. 2021 — Present)" required className="bg-white/5 border-white/10" />
                  <Textarea name="desc" placeholder="Responsibilities and impact..." required className="bg-white/5 border-white/10" />
                  <Button type="submit" disabled={isSaving} className="w-full font-bold">
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Plus size={16} className="mr-2" />}
                    Add Experience
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Career Timeline</h3>
              {experiences?.map(e => (
                <div key={e.id} className="glass-card p-4 rounded-xl border-white/5 flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold">{e.role}</h4>
                    <p className="text-xs text-primary">{e.company} • {e.period}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(`users/${OWNER_ID}/experiences/${e.id}`)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
