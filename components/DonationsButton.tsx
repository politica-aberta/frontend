'use client'

import { Button } from "./ui/button";

interface DonationsButton extends React.HTMLAttributes<HTMLDivElement> {}

export function DonationsButton() {
    const handleRedirect = () => {window.location.replace("https://donate.stripe.com/test_28o6rJ3LUg6H3JKdQQ")}

    return <Button onClick={handleRedirect} className="flex flex-col">
            Faz uma doação ❤️
            </Button>

}