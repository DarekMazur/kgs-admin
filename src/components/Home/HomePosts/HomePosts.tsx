import { PieChart } from '@mui/x-charts/PieChart'

const HomePosts = () => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 46, label: 'Nowe Wpisy' },
            { id: 2, value: 31, label: 'Ukryte wpisy' },
            { id: 3, value: 523, label: 'Pozostałe' }
          ]
        }
      ]}
      width={800}
      height={300}
    />
  )
}

export default HomePosts
