import React, { useState } from "react";
import ProfileCard from "./component";
import { TbBrandAdobe } from "react-icons/tb";

export default function ProfileCardUsage() {
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<Set<string>>(
    new Set()
  );

  const toggleBookmark = (profileId: string) => {
    setBookmarkedProfiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(profileId)) {
        newSet.delete(profileId);
      } else {
        newSet.add(profileId);
      }
      return newSet;
    });
  };

  return (
    <div className="grid place-items-center">
      <ProfileCard
        name="Alex Turner"
        title="Creative Director"
        description="Passionate about creating beautiful and intuitive user experiences with over 8 years in the industry."
        company={{
          name: "Adobe Co.",
          icon: (
            <TbBrandAdobe className="bg-red-600 p-0.5 size-5 rounded-full" />
          ),
          color: "rgb(99 102 241)",
        }}
        rating={4.9}
        hourlyRate={150}
        projectCount={24}
        onContact={() => console.log("Contacting Alex Turner")}
        onBookmark={() => toggleBookmark("alex")}
        isBookmarked={bookmarkedProfiles.has("alex")}
      />
    </div>
  );
}
