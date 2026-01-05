import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./card";
import { Trash2Icon, MapPinIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              size={18}
              className="text-red-500 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Company Logo */}
        {job.company?.logo_url && (
          <img
            src={job.company.logo_url}
            alt={job.company.name}
            className="h-10 w-fit object-contain"
          />
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon size={15} />
          {job.location}
        </div>

        <hr />

        {/* Short Description */}
        <p className="text-sm text-gray-600">
          {job.description.substring(
            0,
            job.description.indexOf(".") + 1
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default JobCard;
