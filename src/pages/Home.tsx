import { Button, Card } from "flowbite-react";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import Container from "../components/Container";

function Home() {
  return (
    <Section className="h-screen bg-gradient-to-br from-purple-300 to-blue-300">
      <Container className="flex h-full items-center">
        <Card className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your impact starts here
          </h1>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Create a design that will attract more customers to your business.
            Customize the design to match your brand identity.
          </p>
          <Button as={Link} to="create" gradientDuoTone="purpleToBlue">
            Get started
          </Button>
        </Card>
      </Container>
    </Section>
  );
}

export default Home;
