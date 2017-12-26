import React from 'react'
import { View } from 'react-native'
import {
  Svg,
  Rect
} from 'react-native-svg'
import AbstractChart from './abstract-chart'

const barWidth = 32

class BarChart extends AbstractChart {
  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data)))
      const barWidth = 32
      return (
        <Rect
          key={Math.random()}
          x={((i + 1) * (width - paddingRight) / data.length)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={barHeight}
          fill="url(#fillShadowGradient)"
        />)
    })
  }

  renderBarTops = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data)))
      return (
        <Rect
          key={Math.random()}
          x={((i + 1) * (width - paddingRight) / data.length)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />)
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 32
    const { width, height, data, style = {} } = this.props
    const config = {
      width,
      height
    }
    return (
      <View style={style}>
        <Svg
          height={height}
          width={width}
        >
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect width="100%" height={height} rx={this.props.style.borderRadius} ry={this.props.style.borderRadius} fill="url(#backgroundGradient)"/>
          {this.renderHorizontalLines({
            ...config,
            count: 4,
            labelCount: data.labels.length,
            paddingTop
          })}
          {this.renderHorizontalLabels({
            ...config,
            count: 4,
            data: data.datasets[0].data,
            labelsCount: data.labels.length,
            paddingTop
          })}
          {this.renderVerticalLabels({
            ...config,
            labels: data.labels,
            paddingRight,
            paddingTop,
            horizontalOffset: barWidth / 2
          })}
          {this.renderBars({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          {this.renderBarTops({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
        </Svg>
      </View>
    )
  }

}

export default BarChart