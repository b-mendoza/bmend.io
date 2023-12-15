import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';

export default function Index() {
  return (
    <>
      <Paragraph size="sm">sm | Let&apos;s talk about your project</Paragraph>
      <Paragraph size="md">md | Let&apos;s talk about your project</Paragraph>
      <Paragraph size="lg">lg | Let&apos;s talk about your project</Paragraph>

      <hr />

      <Heading variant="h1" size="lg">
        h1,lg | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h1" size="md">
        h1,md | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h1" size="sm">
        h1,sm | User Experience Architect & Design Innovator
      </Heading>

      <hr />

      <Heading variant="h2" size="lg">
        h2,lg | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h2" size="md">
        h2,md | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h2" size="sm">
        h2,sm | User Experience Architect & Design Innovator
      </Heading>

      <hr />

      <Heading variant="h3" size="lg">
        h3,lg | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h3" size="md">
        h3,md | User Experience Architect & Design Innovator
      </Heading>
      <Heading variant="h3" size="sm">
        h3,sm | User Experience Architect & Design Innovator
      </Heading>
    </>
  );
}
