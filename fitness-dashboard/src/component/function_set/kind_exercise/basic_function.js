export const Angle_3_point = (results, dot1, dot2, dot3) => {
    const point1 = results.poseLandmarks[dot1]
    const point2 = results.poseLandmarks[dot2]
    const point3 = results.poseLandmarks[dot3]

    const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
    const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };

    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

    const cosAngle = dotProduct / (magnitude1 * magnitude2);
    const angleInRadians = Math.acos(cosAngle);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees;
}

export const Angle_3d = (results, dot1, dot2, dot3) => {
    const point1 = results.poseLandmarks[dot1]
    const point2 = results.poseLandmarks[dot2]
    const point3 = results.poseLandmarks[dot3]

    const vector1 = {
        x: point1.x - point2.x,
        y: point1.y - point2.y,
        z: point1.z - point2.z
    }
    const vector2 = {
        x: point3.x - point2.x,
        y: point3.y - point2.y,
        z: point3.z - point2.z
    }

    function dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    const dotProductValue = dotProduct(vector1, vector2);

    // Calculate the magnitudes of the vectors
    function magnitude(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    const magnitude1 = magnitude(vector1);
    const magnitude2 = magnitude(vector2);

    // Calculate the angle between the two vectors using the dot product formula
    const angle = Math.acos(dotProductValue / (magnitude1 * magnitude2));

    // Convert angle from radians to degrees
    const angleDegrees = (angle * 180) / Math.PI;

    return angleDegrees
}