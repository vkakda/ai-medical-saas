"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import { doctorAgents } from "./DoctorsAgentCard"
import SuggestedDoctors from "./SuggestedDoctors"
import { useRouter } from "next/navigation"

export function AddNewDialog() {

    const [note, setNote] = useState<string>();
    const [loading, setLoading] = useState(false)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgents[]>()
    const [selectedDoctor, setSelectedDoctor] = useState<any>()
    const router = useRouter();

    const OnClickNext = async () => {
    setLoading(true);
    
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        });
       
        console.log(result.data);
        setSuggestedDoctors(result.data);
        setLoading(false);
}

const onStartConsultation = async () => {
    setLoading(true);

    const result = await axios.post('/api/session-chat', {
        notes: note,
        selectedDoctor: selectedDoctor
    });
    console.log(result.data)

    if(result.data?.sessionId){
        console.log(result.data.sessionId)

        router.push('/dashboard/medical-agent/'+result.data.sessionId);
    }
    setLoading(false);

}

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='mt-3'>+ Start a Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Patient's details</DialogTitle>
                    <DialogDescription asChild>
                      {!suggestedDoctors ? 
                        <div>
                            <h2>Add your Symptoms or any other details</h2>
                            <Textarea 
                                placeholder="Type about your problem" 
                                className="mt-2 h-[150px]"
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        :
                        <div>
                            <h2 className="font-semibold text-lg mb-4">Suggested Doctors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                                {suggestedDoctors.map((doctor, index) => (
                                    <SuggestedDoctors key={index} doctorAgents={doctor} setSelectedDoctor={() =>setSelectedDoctor(doctor)}
                                    selectedDoctor={selectedDoctor}
                                     />
                                ))}
                            </div>
                        </div>
                      }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>

                    {!suggestedDoctors ?
                     <Button 
                        disabled={!note || loading} 
                        onClick={() =>OnClickNext()}
                    >
                        Next {loading && <Loader2 className="animate-spin"/> }
                         <ArrowRight />
                    </Button> :
                    <Button disabled={ loading || !selectedDoctor} onClick={()=> onStartConsultation()}>Start Consultation {loading && <Loader2 className="animate-spin"/> }
                         <ArrowRight /></Button>
                     }
                   
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
