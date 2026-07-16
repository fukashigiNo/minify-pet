import { PlayerBar } from "@/widgets/bottom-player";
import { SideBar } from "@/widgets/sidebar";


export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#09070f] text-white overflow-hidden">
      <SideBar />
      <PlayerBar />
    </div>
  );
}
