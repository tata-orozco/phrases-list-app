import { Header, Icon, Title } from './HeaderComponent.styles'

export default function HeaderComponent() {
  return (
    <Header>
      <Icon src="/list-phrases-icon.svg" alt="Phrases List Icon"></Icon>
      <Title>List Phrases App</Title>
    </Header>
  )
}