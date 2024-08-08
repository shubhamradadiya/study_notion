const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async (req, res) => {
    const {courseId , subSectionId} = req.body
    const userId =  req.user.id

    try {
        const subSection = await SubSection.findById(subSectionId)
        if (!subSection) {
            return  res.status(404).json({
                error : "Subsection not found or Invalid"
            })
        }

        const courseProgress =   await CourseProgress.findOne({
            courseID : courseId,
            userId : userId
        })

        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message : "Course Progress not found or Invalid"
            })
        }else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error : "SubSection already completed"
                })
            }

            courseProgress.completedVideos.push(subSectionId)
        }
        await courseProgress.save()

        return  res.status(200).json({
            message : "Course Progress Updated"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error in course progress" })
    }
}