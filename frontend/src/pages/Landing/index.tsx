import { useIntl } from "react-intl"
import PageLayout from "~/layouts/PageLayout"
import TodoList from "./TodoList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.landing.title", defaultMessage: "Landing Page" })}>
      <TodoList />
    </PageLayout>
  )
}
export default LandingPage
