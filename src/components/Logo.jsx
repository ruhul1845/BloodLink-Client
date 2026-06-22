export default function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white">
        <img src="/blood.webp" alt="" className="h-full w-full scale-[1.7] object-cover" />
      </span>
      <span className={`text-2xl font-black ${dark ? "text-white" : "text-[#101828]"}`}>BloodLink</span>
    </div>
  );
}
