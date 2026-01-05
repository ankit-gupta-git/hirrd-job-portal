import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
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
            <Trash2Icon size={18} className="text-red-500 cursor-pointer" />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        {/* Company Logo */}
        <div className="flex justify-center">
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="h-6 w-fit object-contain"
            />
          )}

          {/* Location */}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf(".") + 1)}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to = {`/jobs/${job.id}`} className='flex-1'>
          <Button variant="secondary">More Details</Button>
        </Link>

        <Heart size = {20} stroke = 'red' fill =  'red'/>
       </CardFooter>
    </Card>
  );
};

export default JobCard;
