import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function createIcon(children: React.ReactNode) {
  return React.forwardRef<SVGSVGElement, IconProps>(function Icon(props, ref) {
    return (
      <svg ref={ref} {...baseProps} {...props}>
        {children}
      </svg>
    );
  });
}

export const Calendar = createIcon(
  <>
    <rect x={3.5} y={4.5} width={17} height={16} rx={2} />
    <line x1={3.5} y1={9.5} x2={20.5} y2={9.5} />
    <line x1={8} y1={2.5} x2={8} y2={6.5} />
    <line x1={16} y1={2.5} x2={16} y2={6.5} />
  </>
);

export const Users = createIcon(
  <>
    <circle cx={9} cy={9} r={4} />
    <path d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
    <path d="M16 11a3 3 0 1 0-2-5" />
    <path d="M19.5 20c0-2.2-1.3-4.1-3.1-4.9" />
  </>
);

export const FilePlus2 = createIcon(
  <>
    <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5Z" />
    <path d="M14 2.5v7h7" />
    <line x1={12} y1={13} x2={12} y2={19} />
    <line x1={9} y1={16} x2={15} y2={16} />
  </>
);

export const Stethoscope = createIcon(
  <>
    <path d="M6 4.5v6a4 4 0 1 0 8 0v-6" />
    <path d="M2.5 4.5H9" />
    <path d="M14 13.5a4 4 0 0 0 4 4h1.5" />
    <circle cx={19.5} cy={8.5} r={2.5} />
  </>
);

export const BedDouble = createIcon(
  <>
    <rect x={3} y={10} width={18} height={9} rx={2} />
    <path d="M3 15h18" />
    <path d="M3 13v6" />
    <path d="M21 13v6" />
    <rect x={5} y={6} width={6} height={4} rx={1} />
    <rect x={13} y={6} width={6} height={4} rx={1} />
  </>
);

export const FolderOpen = createIcon(
  <>
    <path d="M3.5 7.5h5l2 3h10a1.5 1.5 0 0 1 1.4 1.9l-1.8 7.2a2 2 0 0 1-1.9 1.4H4.3a2 2 0 0 1-1.9-2.4l1.8-7.2a1.5 1.5 0 0 1 1.4-1.1Z" />
    <path d="M3.5 7.5V5a2 2 0 0 1 2-2h4l2 2h9" />
  </>
);

export const ChevronDown = createIcon(<polyline points="6 9 12 15 18 9" />);

export const Timer = createIcon(
  <>
    <circle cx={12} cy={13} r={8} />
    <path d="M12 13V8" />
    <path d="M9 2.5h6" />
  </>
);

export const Boxes = createIcon(
  <>
    <path d="M3.5 9 12 4l8.5 5-8.5 5z" />
    <path d="M3.5 15.5 12 20l8.5-4.5" />
    <path d="M12 9v11" />
  </>
);

export const FlaskConical = createIcon(
  <>
    <path d="M8 2.5h8" />
    <path d="M10 2.5v6.2l-5 9.3A2 2 0 0 0 6.8 21.5h10.4a2 2 0 0 0 1.8-3.5l-5-9.3V2.5" />
    <path d="M6.5 14.5h11" />
  </>
);

export const Wallet = createIcon(
  <>
    <rect x={3.5} y={6.5} width={17} height={13} rx={2.5} />
    <path d="M20.5 10.5h-5a2 2 0 0 0 0 4h5" />
    <circle cx={15.5} cy={12.5} r={1} />
  </>
);

export const BarChart2 = createIcon(
  <>
    <line x1={4} y1={19.5} x2={20} y2={19.5} />
    <rect x={5.5} y={11} width={3.5} height={7.5} rx={1} />
    <rect x={10.75} y={7} width={3.5} height={11.5} rx={1} />
    <rect x={16} y={3.5} width={3.5} height={15} rx={1} />
  </>
);

export const Syringe = createIcon(
  <>
    <path d="m20 3.5-2.5 2.5" />
    <path d="m17.5 3.5 2 2" />
    <path d="m3.5 17 8-8 4 4-8 8" />
    <path d="M4 21h3l10-10" />
    <path d="M10.5 7.5l3 3" />
  </>
);

export const Pill = createIcon(
  <>
    <rect x={3} y={6} width={18} height={12} rx={6} />
    <path d="m7 10 10 4" />
  </>
);

export const LayoutGrid = createIcon(
  <>
    <rect x={4} y={4} width={6} height={6} rx={1.5} />
    <rect x={14} y={4} width={6} height={6} rx={1.5} />
    <rect x={4} y={14} width={6} height={6} rx={1.5} />
    <rect x={14} y={14} width={6} height={6} rx={1.5} />
  </>
);

export const Clock = createIcon(
  <>
    <circle cx={12} cy={12} r={9} />
    <path d="M12 7.5V12l3 2" />
  </>
);

export const MapPin = createIcon(
  <>
    <path d="M12 21s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z" />
    <circle cx={12} cy={11} r={2.5} />
  </>
);

export const LogOut = createIcon(
  <>
    <path d="M15.5 3.5h-6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6" />
    <path d="m11 12 3 3 3-3-3-3" />
    <line x1={17} y1={12} x2={7} y2={12} />
  </>
);

export const UserCircle2 = createIcon(
  <>
    <circle cx={12} cy={12} r={9} />
    <circle cx={12} cy={10} r={3.5} />
    <path d="M6.5 18.5a7 7 0 0 1 11 0" />
  </>
);
