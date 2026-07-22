import useReveal from "../hooks/useReveal";
import { BorderBeam } from "./ui/border-beam";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import CustomVps from "./CustomVps";

type Tier = {
  name: string;
  price: string;
  note: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

// app hosting plans, billed monthly
const TIERS: Tier[] = [
  {
    name: "Ember",
    price: "$0",
    note: "forever",
    blurb: "For weekend projects.",
    features: ["3 apps", "1 region", "Automatic SSL", "Community support"],
    cta: "Start free",
  },
  {
    name: "Forge",
    price: "$49",
    note: "per month",
    blurb: "For projects that grew up.",
    features: [
      "Unlimited apps",
      "All 38 regions",
      "Auto-scaling",
      "Preview deploys",
      "Email support",
    ],
    featured: true,
    cta: "Choose Forge",
  },
  {
    name: "Foundry",
    price: "$79",
    note: "per month",
    blurb: "For teams shipping daily.",
    features: [
      "Everything in Forge",
      "GPU add-ons",
      "Team seats",
      "Audit logs",
      "Priority support",
    ],
    cta: "Choose Foundry",
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "let us talk",
    blurb: "For scale and compliance.",
    features: [
      "Everything in Foundry",
      "Dedicated servers",
      "SSO and SAML",
      "Uptime commitment",
      "Named support",
    ],
    cta: "Contact sales",
  },
];

type Vps = {
  name: string;
  cpu: string;
  ram: string;
  disk: string;
  net: string;
  price: string;
};

// kvm servers on dedicated cores, flat monthly price, bandwidth guaranteed
const VPS: Vps[] = [
  { name: "nano", cpu: "1 vCPU", ram: "1 GB", disk: "25 GB NVMe", net: "5 Gbps", price: "$4" },
  { name: "micro", cpu: "1 vCPU", ram: "2 GB", disk: "40 GB NVMe", net: "10 Gbps", price: "$6" },
  { name: "small", cpu: "2 vCPU", ram: "4 GB", disk: "80 GB NVMe", net: "20 Gbps", price: "$11" },
  { name: "medium", cpu: "4 vCPU", ram: "8 GB", disk: "160 GB NVMe", net: "40 Gbps", price: "$19" },
  { name: "large", cpu: "8 vCPU", ram: "16 GB", disk: "320 GB NVMe", net: "60 Gbps", price: "$34" },
  { name: "xlarge", cpu: "16 vCPU", ram: "32 GB", disk: "640 GB NVMe", net: "100 Gbps", price: "$58" },
];

// memory-heavy boxes for in-memory databases and big caches, up to a terabyte
const MEM: Vps[] = [
  { name: "mem.64", cpu: "8 vCPU", ram: "64 GB", disk: "160 GB NVMe", net: "10 Gbps", price: "$48" },
  { name: "mem.128", cpu: "16 vCPU", ram: "128 GB", disk: "320 GB NVMe", net: "20 Gbps", price: "$92" },
  { name: "mem.256", cpu: "32 vCPU", ram: "256 GB", disk: "640 GB NVMe", net: "40 Gbps", price: "$180" },
  { name: "mem.512", cpu: "64 vCPU", ram: "512 GB", disk: "1.2 TB NVMe", net: "60 Gbps", price: "$340" },
  { name: "mem.1024", cpu: "128 vCPU", ram: "1 TB", disk: "2.4 TB NVMe", net: "80 Gbps", price: "$640" },
];

// network-first boxes with guaranteed line rate, for edges and streaming
const NET: Vps[] = [
  { name: "net.50", cpu: "8 vCPU", ram: "32 GB", disk: "80 GB NVMe", net: "50 Gbps", price: "$90" },
  { name: "net.100", cpu: "16 vCPU", ram: "64 GB", disk: "160 GB NVMe", net: "100 Gbps", price: "$170" },
  { name: "net.200", cpu: "32 vCPU", ram: "128 GB", disk: "320 GB NVMe", net: "200 Gbps", price: "$320" },
  { name: "net.400", cpu: "64 vCPU", ram: "256 GB", disk: "640 GB NVMe", net: "400 Gbps", price: "$600" },
];

type Gpu = {
  name: string;
  card: string;
  vram: string;
  host: string;
  price: string;
};

// accelerated instances for the enterprise plan, billed by the hour
const GPU: Gpu[] = [
  { name: "gpu.l4", card: "1× NVIDIA L4", vram: "24 GB VRAM", host: "8 vCPU · 32 GB", price: "$0.55" },
  { name: "gpu.l40s", card: "1× NVIDIA L40S", vram: "48 GB VRAM", host: "16 vCPU · 64 GB", price: "$1.20" },
  { name: "gpu.a100", card: "1× NVIDIA A100", vram: "80 GB VRAM", host: "24 vCPU · 128 GB", price: "$1.90" },
  { name: "gpu.h100", card: "1× NVIDIA H100", vram: "80 GB VRAM", host: "32 vCPU · 192 GB", price: "$2.90" },
];

const rowClass =
  "grid items-center gap-x-6 gap-y-1 py-5 transition-colors duration-200 hover:bg-white/[0.02]";

const deployButton =
  "justify-self-end rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-[background-color,border-color,transform] duration-200 ease-out hover:bg-white/10 hover:border-white/25 active:scale-[0.97]";

// one table shape for every cpu/ram/disk/net instance family. highlight marks
// the column that family is built around, so it reads in cobalt.
function InstanceTable({
  title,
  caption,
  rows,
  highlight,
  note,
  reveal,
}: {
  title: string;
  caption: string;
  rows: Vps[];
  highlight: "ram" | "net";
  note: string;
  reveal: ReturnType<typeof useReveal<HTMLDivElement>>;
}) {
  return (
    <div
      ref={reveal.ref}
      className={`hero-anim ${reveal.inView ? "hero-fade" : ""} mt-24 md:mt-32`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3
          className="text-white text-2xl md:text-3xl font-medium"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p className="text-sm text-white/40">{caption}</p>
      </div>

      <div className="mt-8 border-y border-white/[0.07] divide-y divide-white/[0.07]">
        {rows.map((v) => (
          <div
            key={v.name}
            className={`${rowClass} grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,0.9fr))_auto_auto]`}
          >
            <div>
              <p className="text-white font-medium">{v.name}</p>
              <p className="md:hidden text-xs text-white/45 mt-1">
                {v.cpu} · {v.ram} · {v.disk} · {v.net}
              </p>
            </div>
            <p className="hidden md:block text-sm text-white/60">{v.cpu}</p>
            <p
              className={`hidden md:block text-sm ${highlight === "ram" ? "text-[#6082B6]" : "text-white/60"}`}
            >
              {v.ram}
            </p>
            <p className="hidden md:block text-sm text-white/60">{v.disk}</p>
            <p
              className={`hidden md:block text-sm ${highlight === "net" ? "text-[#6082B6]" : "text-white/60"}`}
            >
              {v.net}
            </p>
            <p className="text-right whitespace-nowrap">
              <span
                className="font-playfair italic text-2xl text-white/90"
                style={{ letterSpacing: "-0.02em" }}
              >
                {v.price}
              </span>
              <span className="text-xs text-white/40 ml-1">/mo</span>
            </p>
            <button className={deployButton}>Deploy</button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-white/35">{note}</p>
    </div>
  );
}

export default function Pricing() {
  const header = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>(0.15);
  const vps = useReveal<HTMLDivElement>(0.2);
  const mem = useReveal<HTMLDivElement>(0.2);
  const net = useReveal<HTMLDivElement>(0.2);
  const gpu = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="pricing" className="py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={header.ref}
          className={`hero-anim ${header.inView ? "hero-fade" : ""} max-w-3xl`}
        >
          <p className="mb-6">
            <AnimatedShinyText className="text-xs tracking-[0.25em] uppercase">
              Pricing
            </AnimatedShinyText>
          </p>
          <h2 className="text-white text-4xl sm:text-5xl md:text-7xl leading-[1.02]">
            <span
              className="block font-medium"
              style={{ letterSpacing: "-0.04em" }}
            >
              Pay for iron,
            </span>
            <span
              className="block font-playfair italic font-normal bg-gradient-to-r from-[#b7c9e8] to-[#6082B6] bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.03em" }}
            >
              not for air
            </span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mt-8 max-w-xl">
            Every plan runs on the same metal. Start free, move up when the
            traffic does. Whole machines and GPUs are billed on their own,
            below.
          </p>
        </div>

        <div
          ref={grid.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16 md:mt-24 border-y border-white/[0.07]"
        >
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`hero-anim ${grid.inView ? "hero-fade" : ""} flex flex-col py-12 px-6 ${
                i > 0 ? "lg:border-l lg:border-white/[0.07]" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-white/[0.07]" : ""} ${
                tier.featured ? "relative overflow-hidden bg-white/[0.03]" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tier.featured && (
                <BorderBeam
                  size={70}
                  duration={7}
                  colorFrom="#0047AB"
                  colorTo="#6082B6"
                />
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-white text-lg font-medium">{tier.name}</h3>
                {tier.featured && (
                  <span className="font-playfair italic text-sm text-[#6082B6]">
                    most deployed
                  </span>
                )}
              </div>
              <p className="text-sm text-white/45 mt-1">{tier.blurb}</p>

              <div className="mt-8">
                <span
                  className="font-playfair italic text-5xl text-white/90"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {tier.price}
                </span>
                <span className="text-sm text-white/40 ml-2">{tier.note}</span>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6082B6]/60 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] ${
                  tier.featured
                    ? "bg-[#0047AB] text-white hover:bg-[#003c91] hover:shadow-md hover:shadow-[#0047AB]/20"
                    : "border border-white/15 text-white hover:bg-white/10 hover:border-white/25"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* build your own */}
        <div className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3
              className="text-white text-2xl md:text-3xl font-medium"
              style={{ letterSpacing: "-0.03em" }}
            >
              Build your own
            </h3>
            <p className="text-sm text-white/40">
              Drag the sliders, watch the price settle. Any size you like.
            </p>
          </div>
          <CustomVps />
        </div>

        {/* virtual private servers */}
        <InstanceTable
          title="Virtual private servers"
          caption="KVM on dedicated cores, online in about forty seconds."
          rows={VPS}
          highlight="net"
          note="Every size ships with guaranteed bandwidth, from 5 Gbps on nano up to a full 100 Gbps on xlarge."
          reveal={vps}
        />

        {/* high-memory instances */}
        <InstanceTable
          title="High-memory instances"
          caption="For in-memory databases and heavy caches."
          rows={MEM}
          highlight="ram"
          note="RAM scales to a full terabyte on mem.1024, with NVMe swap sized to match."
          reveal={mem}
        />

        {/* network-optimized instances */}
        <InstanceTable
          title="Network-performance instances"
          caption="Guaranteed line rate for edges, streaming, and game servers."
          rows={NET}
          highlight="net"
          note="Line rate is guaranteed from 50 Gbps, and the edge absorbs DDoS floods up to 3 Tbps before they reach you."
          reveal={net}
        />

        {/* gpu instances */}
        <div
          ref={gpu.ref}
          className={`hero-anim ${gpu.inView ? "hero-fade" : ""} mt-24 md:mt-32`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3
              className="text-white text-2xl md:text-3xl font-medium"
              style={{ letterSpacing: "-0.03em" }}
            >
              GPU instances
            </h3>
            <p className="text-sm text-white/40">
              NVIDIA cards on the same low-latency network, part of Enterprise.
            </p>
          </div>

          <div className="mt-8 border-y border-white/[0.07] divide-y divide-white/[0.07]">
            {GPU.map((g, i) => (
              <div
                key={g.name}
                className={`${rowClass} grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,1fr))_auto_auto]`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div>
                  <p className="text-white font-medium">{g.name}</p>
                  <p className="md:hidden text-xs text-white/45 mt-1">
                    {g.card} · {g.vram} · {g.host}
                  </p>
                </div>
                <p className="hidden md:block text-sm text-white/60">{g.card}</p>
                <p className="hidden md:block text-sm text-[#6082B6]">{g.vram}</p>
                <p className="hidden md:block text-sm text-white/60">{g.host}</p>
                <p className="text-right whitespace-nowrap">
                  <span
                    className="font-playfair italic text-2xl text-white/90"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {g.price}
                  </span>
                  <span className="text-xs text-white/40 ml-1">/hr</span>
                </p>
                <button className={deployButton}>Launch</button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/35">
            Bigger clusters, reserved cards, and custom builds go through the
            Enterprise plan.
          </p>
        </div>
      </div>
    </section>
  );
}
