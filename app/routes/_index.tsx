import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'New Remix App' },
  { content: 'Welcome to Remix!', name: 'description' },
];

export default function Index() {
  return <h1>Hello World</h1>;
}
