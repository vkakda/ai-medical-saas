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
import { useEffect, useState } from "react"
import { doctorAgents } from "./DoctorsAgentCard"
import SuggestedDoctors from "./SuggestedDoctors"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function AddNewDialog() {

    const [note, setNote] = useState<string>();
    const [loading, setLoading] = useState(false)
    const [eligibilityLoading, setEligibilityLoading] = useState(true)
    const [canStartConsultation, setCanStartConsultation] = useState(true)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgents[]>()
    const [selectedDoctor, setSelectedDoctor] = useState<any>()
    const router = useRouter();

    useEffect(() => {
      const loadEligibility = async () => {
        try {
          const res = await axios.get("/api/consultation-eligibility");
          setCanStartConsultation(!!res.data?.canStartConsultation);
        } catch {
          // If eligibility can't be fetched, don't block UX
          setCanStartConsultation(true);
        } finally {
          setEligibilityLoading(false);
        }
      };

      loadEligibility();
    }, []);

    const goToBilling = () => {
      toast.error("Free plan allows only 1 consultation. Please upgrade to Premium.");
      router.push("/dashboard/billing");
    };

    const OnClickNext = async () => {
      setLoading(true);

      try {
        const result = await axios.post("/api/suggest-doctors", {
          notes: note,
        });

        console.log(result.data);

        // multiple possible shapes from the server/model
        let doctors: any[] | undefined;
        if (Array.isArray(result.data)) {
          doctors = result.data;
        } else if (Array.isArray(result.data.doctors)) {
          doctors = result.data.doctors;
        } else if (Array.isArray(result.data.recommended_doctors)) {
          doctors = result.data.recommended_doctors;
        } else if (Array.isArray(result.data.recommendedDoctors)) {
          doctors = result.data.recommendedDoctors;
        }

        if (Array.isArray(doctors) && doctors.length > 0) {
          setSuggestedDoctors(doctors as doctorAgents[]);
        } else {
          toast.error(
            "Could not find any doctors. Please try again or adjust your notes."
          );
        }
      } catch (err: any) {
        const msg =
          err?.response?.data?.error?.message ||
          err?.message ||
          "Failed to fetch suggested doctors.";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    }

const onStartConsultation = async () => {
    setLoading(true);

    try {
      const result = await axios.post('/api/session-chat', {
          notes: note,
          selectedDoctor: selectedDoctor
      });
      console.log(result.data)

      if(result.data?.sessionId){
          console.log(result.data.sessionId)

          router.push('/dashboard/medical-agent/'+result.data.sessionId);
      }
    } catch (err: any) {
      if (err?.response?.status === 402) {
        goToBilling();
      } else {
        toast.error("Failed to start consultation");
      }
    } finally {
      setLoading(false);
    }

}

    return (
      eligibilityLoading ? (
        <Button className="mt-3" disabled>
          <Loader2 className="animate-spin" />
          Checking plan...
        </Button>
      ) : !canStartConsultation ? (
        <Button className="mt-3" variant="secondary" onClick={goToBilling}>
          Upgrade to Premium
          <ArrowRight />
        </Button>
      ) : (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='mt-3'>+ Start a Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Patient's details</DialogTitle>
                    <DialogDescription asChild>
                      {Array.isArray(suggestedDoctors) && suggestedDoctors.length > 0 ? (
                        <div>
                            <h2 className="font-semibold text-lg mb-4">Suggested Doctors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                                {suggestedDoctors.map((doctor, index) => (
                                    <SuggestedDoctors
                                        key={doctor?.id ?? index}
                                        doctorAgents={doctor}
                                        setSelectedDoctor={() => setSelectedDoctor(doctor)}
                                        selectedDoctor={selectedDoctor}
                                    />
                                ))}
                            </div>
                        </div>
                      ) : (
                        <div>
                            <h2>Add your Symptoms or any other details</h2>
                            <Textarea 
                                placeholder="Type about your problem" 
                                className="mt-2 h-[150px]"
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                      )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
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
    )
}
