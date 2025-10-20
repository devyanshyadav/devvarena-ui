import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiLink } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideMailPlus } from "lucide-react";

export interface UserAvatar {
  id?: string;
  name?: string;
  avatarUrl?: string;
  tooltipContent?: React.ReactNode;
  description?: string;
}

interface DocMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  users?: UserAvatar[];
  maxVisibleUsers?: number;
  onCopyLink?: () => void;
  onInvite?: () => void;
  copyLinkIcon?: React.ReactNode;
  inviteIcon?: React.ReactNode;
  inviteButtonText?: string;
  showCopyLinkButton?: boolean;
  showInviteButton?: boolean;
}
const docUsers: UserAvatar[] = [
  {
    id: "1",
    name: "Jake",
    avatarUrl: "https://img.icons8.com/?size=48&id=jxd84l3wJsts&format=png",
    description: "Viewed 3h ago",
  },
  {
    id: "2",
    name: "Bubbles",
    avatarUrl: "https://img.icons8.com/?size=48&id=mJbFA2D6hmnY&format=png",
    description: "Viewed 5h ago",
  },
  {
    id: "3",
    name: "Mario",
    avatarUrl: "https://img.icons8.com/?size=48&id=n2v99rZKO7h5&format=png",
    description: "Viewed 1d ago",
  },
  {
    id: "4",
    name: "Kyle",
    avatarUrl: "https://img.icons8.com/?size=48&id=H8GZaqcSTyLz&format=png",
    description: "Viewed 2d ago",
  },
];

const DocMenu = React.forwardRef<HTMLDivElement, DocMenuProps>(
  (
    {
      users = docUsers,
      maxVisibleUsers = 4,
      onCopyLink,
      onInvite,
      copyLinkIcon,
      inviteIcon,
      inviteButtonText = "Invite",
      showCopyLinkButton = true,
      showInviteButton = true,
      className,
      ...props
    },
    ref
  ) => {
    const visibleUsers = users?.slice(0, maxVisibleUsers);
    const userWidth = 55;

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-fit items-center justify-center rounded-3xl bg-muted border-2 border-border *:p-2 pr-1",
          className
        )}
        {...props}
      >
        <div
          className="flex flex-nowrap items-center justify-center -space-x-4 overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0,_white_40px,white_calc(100%-40px),_transparent_100%)] px-3 *:aspect-square *:h-[60px] *:w-[60px] *:inline-block *:rounded-full *:border-2 *:border-muted *:p-1 *:bg-primary *:transition-all *:duration-200 *:hover:mx-0 *:[&:has(+_button:hover)]:!mx-0"
          style={{ width: `calc(${maxVisibleUsers} * ${userWidth}px)` }}
        >
          {visibleUsers?.map((user, index) => (
            <Tooltip key={user.id || index}>
              <TooltipTrigger asChild>
                <button>
                  <img
                    className="rounded-full"
                    src={user.avatarUrl || ""}
                    alt={user.name || "User"}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                {user.tooltipContent ? (
                  user.tooltipContent
                ) : (
                  <>
                    {user.name && <p className="font-semibold">{user.name}</p>}
                    {user.description && <p>{user.description}</p>}
                  </>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {showCopyLinkButton && (
            <Button
              onClick={onCopyLink}
              className="h-[50px] rounded-xl w-[50px]"
            >
              {copyLinkIcon || <FiLink className="size-6" />}
            </Button>
          )}
          {showInviteButton && (
            <Button
              onClick={onInvite}
              className="h-[50px] rounded-xl text-base"
            >
              {inviteIcon || <LucideMailPlus className="size-6" />}{" "}
              {inviteButtonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

DocMenu.displayName = "DocMenu";

export { DocMenu, type DocMenuProps };
