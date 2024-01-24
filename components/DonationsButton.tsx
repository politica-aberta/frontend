'use client'

import { Button } from "./ui/button";

interface DonationsButton extends React.HTMLAttributes<HTMLDivElement> {}

export function DonationsButton() {
    const handleRedirect = () => {window.location.replace("https://donate.stripe.com/3csbLi47Rb5S8AU144")}

    return <Button onClick={handleRedirect} className="flex flex-col">
            Faz uma doação ❤️
            </Button>

}