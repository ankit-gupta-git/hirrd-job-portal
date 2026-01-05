import useFetch from "@/hooks/use-fetch";
import { getJobs } from "@/api/apiJobs";
import React, { useEffect } from "react";
import JobCard from "@/components/ui/job-card";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />;
  }

  return <div>
    <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

    {loadingJobs && <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />}

    {loadingJobs === false && dataJobs?.length === 0 (
      <div>
        {jobs?.length ? {
          jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })
          
        ) : (
          <div>No Jobs Found 😓</div>
        )}
      </div>
    )}
  </div>
  );
};

export default JobListing;
