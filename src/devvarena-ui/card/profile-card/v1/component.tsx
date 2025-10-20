import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star, Flag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  name: string;
  title: string;
  description?: string;
  profileImage?: string;
  profileImageAlt?: string;
  backgroundImage?: string;
  company?: {
    name: string;
    icon?: React.ReactNode;
    color?: string;
  };
  rating?: number;
  hourlyRate?: string | number;
  projectCount?: number;
  timeUnit?: string;
  onContact?: () => void;
  onBookmark?: () => void;
  contactButtonText?: string;
  isBookmarked?: boolean;
  className?: string;
  showStats?: boolean;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      name,
      title,
      description,
      profileImage = "https://images.pexels.com/photos/33485275/pexels-photo-33485275.jpeg",
      profileImageAlt,
      backgroundImage = "/devvarena-ui-assets/pattern-bg.png",
      company,
      rating = 5.0,
      hourlyRate = "$150",
      projectCount = 24,
      timeUnit = "Month",
      onContact,
      onBookmark,
      contactButtonText = "Get In Touch",
      isBookmarked = false,
      className,
      showStats = true,
      ...props
    },
    ref
  ) => {
    const formatRate = (rate: string | number) => {
      if (typeof rate === "number") {
        return `$${rate}`;
      }
      return rate;
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "min-w-xs max-w-[20rem] bg-gradient-to-br from-secondary to-card shadow rounded-[40px] p-3.5",
          className
        )}
        {...props}
      >
        <CardContent className="p-0">
          {/* Background Header */}
          <div
            className="h-[7.5rem] bg-muted w-full rounded-[28px] bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          ></div>

          {/* Profile Image and Company Badge */}
          <div className="flex w-full -translate-y-9 items-center justify-between px-3">
            <div
              className="h-16 w-16 ring-2 ring-secondary rounded-full bg-background bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${profileImage}')`,
              }}
              role="img"
              aria-label={profileImageAlt || `${name}'s profile picture`}
            ></div>

            {company && (
              <Button
                className={cn(
                  "flex items-center gap-2 rounded-full p-2 px-4 font-semibold text-white",
                  company.color || "bg-indigo-500 hover:bg-indigo-600"
                )}
                style={
                  company.color ? { backgroundColor: company.color } : undefined
                }
              >
                {company.icon}
                {company.name}
              </Button>
            )}
          </div>

          {/* Profile Info */}
          <div className="mx-2">
            <div className="flex -translate-y-5 items-center justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{name}</h2>
                <span className="text-sm text-muted-foreground">{title}</span>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>

              {onBookmark && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full text-muted-foreground hover:text-primary"
                  onClick={onBookmark}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </Button>
              )}
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>
                    <h4 className="font-semibold text-sm">{rating}</h4>
                    <p className="font-medium text-muted-foreground text-xs">
                      Rating
                    </p>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Flag className="h-5 w-5 text-blue-500" />
                  <span>
                    <h4 className="font-semibold text-sm">
                      {formatRate(hourlyRate)}
                    </h4>
                    <p className="font-medium text-muted-foreground text-xs">
                      hours
                    </p>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span>
                    <h4 className="font-semibold text-sm">{projectCount}</h4>
                    <p className="font-medium text-muted-foreground text-xs">
                      {timeUnit}
                    </p>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Button */}
          <Button
            size="lg"
            className="w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-6 after:bg-gradient-to-b after:transparent after:to-gray-500/60 overflow-hidden relative h-11 rounded-full mt-5"
            onClick={onContact}
          >
            {contactButtonText}
          </Button>
        </CardContent>
      </Card>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
