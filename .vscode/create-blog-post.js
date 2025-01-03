const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

// Get command line argument for blog title
const blogTitle = process.argv[2] || 'my-new-post'

// Create YYYYMMDD date string
const date = new Date()
const dateString = date.toISOString().slice(0, 10).replace(/-/g, '')

// Create the file path
const blogDir = path.join(__dirname, '..', 'data', 'blog')
const fileName = `${dateString}_${blogTitle}.mdx`
const filePath = path.join(blogDir, fileName)

// Create blog post template
const template = `---
title: ""
summary: ""
date: "${date.toISOString().split('T')[0]}"
lastmod: "${date.toISOString().split('T')[0]}"
tags: []
layout: "PostLayout"
draft: true
---

`

// Create directory if it doesn't exist
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

// Write the file
try {
  fs.writeFileSync(filePath, template)
  console.log(`Created blog post: ${filePath}`)

  // Open the file in VSCode
  exec(`code "${filePath}"`, (error) => {
    if (error) {
      console.error('Error opening VSCode:', error)
      process.exit(1)
    }
    console.log('Opened file in VSCode')
  })
} catch (error) {
  console.error('Error creating blog post:', error)
  process.exit(1)
}
