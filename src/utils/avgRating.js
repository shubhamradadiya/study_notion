export default function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0) return 0
    const total = ratingArr.reduce((acc, obj) => {
        acc+= obj.rating 
         return acc}, 0);
    const averageRating = total / ratingArr.length;

    return averageRating
}