import { Presentation,Collections } from "@/components";


export default function Home() {
  return (
    <div className="overflow-hidden flex-1">
      <Presentation/> {/* Section de presentation dans le main page*/}
      <Collections/>{/* Section de presentation des collections*/}
    </div>
  );
}
//////