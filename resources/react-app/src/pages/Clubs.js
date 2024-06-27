import React from "react";
import CallToAction from "../components/calltoaction/CallToAction";
import { ClubsCard } from "../components/clubs/ClubsCard";
import { Helmet } from "react-helmet";
export const Clubs = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Kulüplerimiz</title>
                <link rel="canonical" href="/kuluplerimiz" />
                <meta name="description" content="Sports International" />
                <meta name="description" content="Kuluplerimiz" />
            </Helmet>
            <div>
                <ClubsCard />
                <CallToAction menu={false} />
            </div>
        </>
    );
};
