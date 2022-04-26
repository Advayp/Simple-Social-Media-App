import { Badge } from "@chakra-ui/react";
import React from "react";

const colorScheme = {
    New: "green",
    Old: "gray",
    Pro: "purple",
    Newbie: "teal",
    Master: "red",
};

type AvailableBadges = "New" | "Old" | "Pro" | "Newbie" | "Master";

interface Props {
    badgeLabel: AvailableBadges;
}

export const MyBadge: React.FC<Props> = ({ badgeLabel }) => {
    return (
        <Badge
            borderRadius={"md"}
            colorScheme={colorScheme[badgeLabel]}
            mb={1}
            ml={0.2}
        >
            {badgeLabel}
        </Badge>
    );
};
