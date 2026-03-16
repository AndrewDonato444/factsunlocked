#!/bin/bash
set -euo pipefail

CHANNEL_ID="69b732e87be9f8b1715d1b14"
BUFFER_KEY="0A4upHKLOyJOhDk90ntuPig8RUyUqSgRarB-bkGSyft"
API="https://api.buffer.com/graphql"

schedule_post() {
  local title="$1"
  local text="$2"
  local due_at="$3"
  local video_url="$4"
  local label="$5"

  local query="mutation { createPost(input: { channelId: \"${CHANNEL_ID}\", text: \"${text}\", mode: customScheduled, schedulingType: automatic, dueAt: \"${due_at}\", metadata: { youtube: { title: \"${title}\", categoryId: \"22\", notifySubscribers: true, madeForKids: false } }, assets: { videos: [{ url: \"${video_url}\" }] }, aiAssisted: true, source: \"content-engine-skill\" }) { ... on PostActionSuccess { post { id status dueAt } } ... on InvalidInputError { message } ... on UnexpectedError { message } ... on LimitReachedError { message } } }"

  local payload
  payload=$(python3 -c "import json; print(json.dumps({'query': '''$query'''}))")

  local result
  result=$(curl -s -X POST "$API" \
    -H "Authorization: Bearer $BUFFER_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")

  echo "$label: $result"
}

echo "Scheduling 5 YouTube Shorts for Baby Facts Unlocked..."
echo ""

schedule_post \
  "Babies Are Born With 300 Bones #BabyFacts #Shorts" \
  "Your baby has MORE bones than you do right now. Babies are born with about 300 bones, nearly 100 more than adults. As they grow, many bones fuse together. #BabyFacts #Shorts #NewbornTrivia #BabyScience" \
  "2026-03-17T15:00:00Z" \
  "https://res.cloudinary.com/dk74vmp31/video/upload/v1773615712/baby-facts-unlocked/ifyydi8yqruwfysqn9ss.mp4" \
  "Short #1 (Mon 3/17)"

schedule_post \
  "Newborns Can Only See 12 Inches Away #BabyFacts #Shorts" \
  "Your newborn is basically blind and its on purpose. They can only see 8-12 inches away, exactly the distance to your face when feeding. #BabyFacts #Shorts #InfantDevelopment #NewParents" \
  "2026-03-18T15:00:00Z" \
  "https://res.cloudinary.com/dk74vmp31/video/upload/v1773615713/baby-facts-unlocked/dedyskhxjma9ygu47a24.mp4" \
  "Short #2 (Tue 3/18)"

schedule_post \
  "Babies Can Breathe and Swallow at the Same Time #BabyFacts #Shorts" \
  "Babies have a superpower every adult has lost. They can breathe and swallow at the same time. Their larynx sits higher in the throat creating separate pathways. #BabyFacts #Shorts #BabyScience" \
  "2026-03-19T15:00:00Z" \
  "https://res.cloudinary.com/dk74vmp31/video/upload/v1773615715/baby-facts-unlocked/evoppuvmbeazbk8lu83p.mp4" \
  "Short #3 (Wed 3/19)"

schedule_post \
  "Babies Dont Cry Real Tears at First #BabyFacts #Shorts" \
  "Your newborns tears are fake. Literally. Newborns dont produce real tears until 2-4 weeks old because their tear ducts arent fully developed. #BabyFacts #Shorts #NewbornTrivia" \
  "2026-03-20T15:00:00Z" \
  "https://res.cloudinary.com/dk74vmp31/video/upload/v1773615717/baby-facts-unlocked/e8b811rllqx7weawumrq.mp4" \
  "Short #4 (Thu 3/20)"

schedule_post \
  "Why Babies Love Being Shushed #BabyFacts #Shorts" \
  "The womb is louder than a vacuum cleaner at 80-90 decibels. Thats why shushing calms your baby, it mimics the blood flow sound they heard for 9 months. #BabyFacts #Shorts #ParentingTips" \
  "2026-03-21T15:00:00Z" \
  "https://res.cloudinary.com/dk74vmp31/video/upload/v1773615718/baby-facts-unlocked/cysa95vpzbgekycfhqme.mp4" \
  "Short #5 (Fri 3/21)"

echo ""
echo "Done scheduling."
