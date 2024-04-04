interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className=" text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export const SecondHeading = ({ title }: { title: string }) => {
  return (
    <div>
      <h4 className="text-2xl font-semibold tracking-tight">{title}</h4>
    </div>
  );
};
