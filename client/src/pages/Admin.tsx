import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, RefreshCw, Users } from "lucide-react";

interface Submission {
  id: number;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: string;
  teamSize: string;
  customerChannels: string[];
  painPoints: string[];
  processesToAutomate: string[];
  mainGoal: string;
  timeline: string;
  budget: string;
  tools?: string;
  contactMethod: string;
  additionalInfo?: string;
  createdAt: string;
}

const SESSION_KEY = "pas_admin_key";

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setAuthed(true);
      fetchSubmissions(stored);
    }
  }, []);

  async function fetchSubmissions(adminKey: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
        toast({ title: "Invalid key", variant: "destructive" });
        return;
      }
      const data = await res.json();
      setSubmissions(data);
    } catch {
      toast({ title: "Failed to load submissions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  function login() {
    if (!key.trim()) return;
    sessionStorage.setItem(SESSION_KEY, key.trim());
    setAuthed(true);
    fetchSubmissions(key.trim());
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setSubmissions([]);
    setKey("");
  }

  function refresh() {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) fetchSubmissions(stored);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
            />
            <Button className="w-full" onClick={login}>
              Sign in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">Leads — PrimeAutomate Systems</h1>
          <Badge variant="secondary">{submissions.length} total</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-1" /> Sign out
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-3 max-w-5xl mx-auto">
        {submissions.length === 0 && !loading && (
          <p className="text-center text-muted-foreground py-16">No submissions yet.</p>
        )}

        {submissions.map((s) => (
          <Card key={s.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{s.businessName}</span>
                    <span className="text-muted-foreground text-sm">— {s.fullName}</span>
                    <Badge variant="outline" className="text-xs">{s.businessType}</Badge>
                    <Badge variant="outline" className="text-xs">{s.timeline}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex gap-4 flex-wrap">
                    <span>{s.email}</span>
                    <span>{s.phone}</span>
                    <span>{s.contactMethod}</span>
                    <span className="font-medium text-foreground">{s.budget}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>

              {expanded === s.id && (
                <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Pain Points</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                      {s.painPoints.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Processes to Automate</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                      {s.processesToAutomate.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Customer Channels</p>
                    <p className="text-muted-foreground">{s.customerChannels.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Team Size</p>
                    <p className="text-muted-foreground">{s.teamSize}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Main Goal</p>
                    <p className="text-muted-foreground">{s.mainGoal}</p>
                  </div>
                  {s.website && (
                    <div>
                      <p className="font-medium mb-1">Website</p>
                      <a href={s.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{s.website}</a>
                    </div>
                  )}
                  {s.tools && (
                    <div className="md:col-span-2">
                      <p className="font-medium mb-1">Current Tools</p>
                      <p className="text-muted-foreground">{s.tools}</p>
                    </div>
                  )}
                  {s.additionalInfo && (
                    <div className="md:col-span-2">
                      <p className="font-medium mb-1">Additional Info</p>
                      <p className="text-muted-foreground">{s.additionalInfo}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
