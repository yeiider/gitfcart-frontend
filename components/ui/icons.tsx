export function GiftCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8v12" />
      <path d="M19 12v.01" />
      <path d="M19 16v.01" />
      <path d="M15 12v.01" />
      <path d="M15 16v.01" />
      <path d="M7 16v.01" />
      <path d="M7 12v.01" />
      <path d="M3 12v.01" />
      <path d="M3 16v.01" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

