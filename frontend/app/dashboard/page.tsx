"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL,HOOK_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";
import { TriggerLogo } from "@/components/trigger-logo";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "zapId":string,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
        }
    }[],
    "zapRuns": {
        "id": string,
        "zapId": string,
        "metadata": any,
        "zapRunOutbox": any
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                console.log(res.data);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export default function() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return <div>
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <TriggerLogo className="w-8 h-8 animate-pulse-slow" />
              <span className="text-xl font-bold text-foreground">Trigger</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
        <div className="flex justify-center pt-8">
            <div className="max-w-5xl	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Triggers
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
            </div>
        </div>
    </div>
}

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full">
        <div className="flex">
                <div className="flex-1">id</div>
                <div className="flex-1">User ID</div>
                <div className="flex-1">actions</div>
                <div className="flex-1"></div>
        </div>
        {zaps.map(z => <div className="flex border-b border-t py-4">
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">{z.userId}</div>
            <div className="flex-1">{z.actions.length ?? 0}</div>
            <div className="flex-1"><LinkButton onClick={() => {
                    axios.post(`${HOOK_URL}/${z.userId}/${z.id}`,{
                        'to':'deveshshukla1603@gmail.com',
                        'body':'hey sending with in body',
                        'subject':"noting"
                    })
                }}>Go</LinkButton></div>
        </div>)}
    </div>
}